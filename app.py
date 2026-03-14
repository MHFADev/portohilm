import os
import json
from flask import Flask, render_template, request, jsonify
import logging
from email_validator import validate_email, EmailNotValidError
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

# Configure for Replit environment - trust proxy headers
app.config['PREFERRED_URL_SCHEME'] = 'https'
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


def get_sendgrid_credentials():
    """
    Get SendGrid credentials from either Replit connector or environment variables.
    Works both in Replit and Vercel deployment.
    """
    # Try Replit connector first (for Replit environment)
    try:
        import requests
        hostname = os.environ.get('REPLIT_CONNECTORS_HOSTNAME')
        x_replit_token = None

        repl_identity = os.environ.get('REPL_IDENTITY')
        web_repl_renewal = os.environ.get('WEB_REPL_RENEWAL')

        if repl_identity:
            x_replit_token = 'repl ' + repl_identity
        elif web_repl_renewal:
            x_replit_token = 'depl ' + web_repl_renewal

        if hostname and x_replit_token:
            response = requests.get(
                f'https://{hostname}/api/v2/connection?include_secrets=true&connector_names=sendgrid',
                headers={
                    'Accept': 'application/json',
                    'X_REPLIT_TOKEN': x_replit_token
                })

            if response.status_code == 200:
                data = response.json()
                connection_settings = data.get('items', [{}])[0]

                if connection_settings and connection_settings.get(
                        'settings', {}).get('api_key'):
                    api_key = connection_settings['settings']['api_key']
                    from_email = connection_settings['settings']['from_email']
                    logging.info(
                        "Using SendGrid credentials from Replit connector")
                    return api_key, from_email
    except Exception as e:
        logging.debug(f"Replit connector not available: {str(e)}")

    # Fallback to standard environment variables (for Vercel or other platforms)
    api_key = os.environ.get('SENDGRID_API_KEY')
    from_email = os.environ.get('SENDGRID_FROM_EMAIL')

    if api_key and from_email:
        logging.info("Using SendGrid credentials from environment variables")
        return api_key, from_email

    raise ValueError(
        "SendGrid credentials not found. Set SENDGRID_API_KEY and SENDGRID_FROM_EMAIL environment variables."
    )


@app.route('/')
def index():
    """Main portfolio page"""
    return render_template('index.html')


@app.route('/order-form')
def order_form():
    """Order form page for web services"""
    return render_template('order-form.html')


@app.route('/gallery/<gallery_type>')
def gallery(gallery_type):
    """Gallery pages for different project types"""
    if gallery_type not in ['ict', 'coding']:
        return render_template('index.html')

    gallery_data = {
        'coding': {
            'title':
            'Development Showcase',
            'description':
            'A curated collection of web development projects, from initial architecture to final deployment.',
            'summary':
            'A comprehensive journey through modern web development, mastering frontend frameworks, backend systems, and performance engineering.',
            'images': [{
                'url':
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                'title':
                'Full-Stack Development',
                'description':
                'Building scalable web applications with React.js.',
                'context':
                'Architecting high-performance web applications with focus on accessibility and user experience.',
                'tools':
                ['React.js', 'Tailwind CSS', 'Three.js', 'GSAP', 'Vite'],
                'role':
                'Frontend Developer',
                'outcome':
                'Website portfolio dengan 3D animations, dark/light theme, dan fully responsive. Performance score 95+ di Google Lighthouse. Deployment menggunakan Vercel.'
            }, {
                'url':
                'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
                'title':
                'Collaborative Problem Solving',
                'description':
                'Cross-functional team collaboration and technical troubleshooting.',
                'context':
                'Collaborating with peers to resolve complex architecture challenges and optimize code quality through peer reviews.',
                'tools': [
                    'Git/GitHub', 'VS Code Live Share', 'Discord',
                    'Chrome DevTools'
                ],
                'role':
                'Collaborative Developer',
                'outcome':
                'Successfully resolved critical state management issues. Enhanced technical leadership and collaborative problem-solving skills.'
            }, {
                'url':
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                'title':
                'Performance Optimization',
                'description':
                'Optimizing critical rendering paths and bundle sizes.',
                'context':
                'Deep dive into performance profiling and implementing code-splitting strategies.',
                'tools': [
                    'Chrome DevTools', 'React DevTools', 'Lighthouse',
                    'webpack Bundle Analyzer'
                ],
                'role':
                'Performance Engineer',
                'outcome':
                'Mengurangi bundle size 35%, page load time dari 4.5s menjadi 1.8s. Implementasi code splitting dan lazy loading. First Contentful Paint improved 60%.'
            }]
        },
        'ict': {
            'title': 'ICT & Infrastructure Gallery',
            'description': 'Professional documentation of ICT projects, network management, and infrastructure solutions.',
            'summary': 'Hands-on experience in managing enterprise-grade network infrastructure, hardware optimization, and systems administration.',
            'images': [
                {
                    'url': 'https://images.unsplash.com/photo-1558494949-efc02570fbc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'title': 'Network Configuration',
                    'description': 'Konfigurasi Switch dan Router',
                    'context': 'Setup dan maintenance infrastruktur jaringan lokal (LAN) untuk memastikan konektivitas yang stabil.',
                    'tools': ['Cisco Packet Tracer', 'Wireshark', 'Mikrotik'],
                    'role': 'Network Administrator',
                    'outcome': 'Jaringan stabil dengan uptime 99.9%, konfigurasi VLAN yang aman.'
                },
                {
                    'url': 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
                    'title': 'Hardware Maintenance',
                    'description': 'Perbaikan dan upgrade server',
                    'context': 'Melakukan maintenance rutin pada server fisik dan upgrade komponen hardware.',
                    'tools': ['Server Rack', 'Thermal Paste', 'Diagnostic Tools'],
                    'role': 'Hardware Technician',
                    'outcome': 'Peningkatan performa server dan perpanjangan masa pakai hardware.'
                }
            ]
        }
    }

    return render_template('gallery.html',
                           gallery_type=gallery_type,
                           data=gallery_data[gallery_type])


def send_to_discord_async(data):
    """Send form data to Discord webhook asynchronously (non-blocking)"""
    import threading
    import requests
    
    def _send_discord():
        webhook_url = os.environ.get('DISCORD_WEBHOOK_URL')
        if not webhook_url:
            logging.warning('Discord webhook URL not configured')
            return
        
        try:
            # Check if this is order form or contact form
            is_order_form = 'company' in data and 'service' in data
            
            if is_order_form:
                # Order form submission
                embed = {
                    "title": "🎉 Pesanan Website Baru!",
                    "color": 65280,  # Green color
                    "fields": [
                        {"name": "👤 Nama", "value": data.get('name', 'N/A'), "inline": True},
                        {"name": "🏢 Perusahaan", "value": data.get('company', 'N/A'), "inline": True},
                        {"name": "📧 Email", "value": data.get('email', 'N/A'), "inline": True},
                        {"name": "📱 Telepon", "value": data.get('phone', 'N/A'), "inline": True},
                        {"name": "💼 Layanan", "value": data.get('service', 'N/A'), "inline": False},
                        {"name": "💰 Budget", "value": data.get('budget', 'N/A'), "inline": True},
                        {"name": "⏰ Timeline", "value": data.get('timeline', 'N/A'), "inline": True},
                        {"name": "📝 Deskripsi", "value": data.get('description', 'N/A'), "inline": False},
                    ],
                    "timestamp": __import__('datetime').datetime.utcnow().isoformat()
                }
                
                if data.get('additional'):
                    embed["fields"].append({"name": "ℹ️ Info Tambahan", "value": data.get('additional'), "inline": False})
            else:
                # Contact form submission
                embed = {
                    "title": "📨 Pesan Baru dari Portfolio",
                    "color": 3447003,  # Blue color
                    "fields": [
                        {"name": "👤 Nama", "value": data.get('name', 'N/A'), "inline": True},
                        {"name": "📧 Email", "value": data.get('email', 'N/A'), "inline": True},
                        {"name": "📌 Subjek", "value": data.get('subject', 'N/A'), "inline": False},
                        {"name": "💬 Pesan", "value": data.get('message', 'N/A'), "inline": False},
                    ],
                    "timestamp": __import__('datetime').datetime.utcnow().isoformat()
                }
            
            payload = {
                "embeds": [embed],
                "username": "Portfolio Bot"
            }
            
            response = requests.post(webhook_url, json=payload, timeout=5)
            
            if response.status_code in [200, 204]:
                logging.info(f"Successfully sent to Discord webhook")
            else:
                logging.warning(f"Discord webhook returned status {response.status_code}: {response.text}")
                
        except requests.exceptions.Timeout:
            logging.warning(f"Discord webhook timed out after 5 seconds")
        except requests.exceptions.RequestException as e:
            logging.warning(f"Discord webhook request failed: {str(e)}")
        except Exception as e:
            logging.error(f"Unexpected error sending to Discord: {str(e)}")
    
    # Run in background thread to avoid blocking
    thread = threading.Thread(target=_send_discord, daemon=True)
    thread.start()


@app.route('/submit-order', methods=['POST'])
def submit_order():
    """Handle order form submission - sends to Discord webhook"""
    import requests
    
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'company', 'email', 'phone', 'service', 'budget', 'timeline', 'description']
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return jsonify({
                'success': False,
                'message': f'Field berikut harus diisi: {", ".join(missing_fields)}'
            }), 400
        
        # Validate email format
        try:
            validate_email(data['email'])
        except EmailNotValidError:
            return jsonify({
                'success': False,
                'message': 'Format email tidak valid'
            }), 400
        
        # Get Discord webhook URL
        webhook_url = os.environ.get('DISCORD_WEBHOOK_URL')
        
        if not webhook_url:
            logging.warning('DISCORD_WEBHOOK_URL not configured - order cannot be sent')
            return jsonify({
                'success': False,
                'message': 'Sistem notifikasi belum dikonfigurasi. Silakan hubungi administrator.'
            }), 500
        
        # Create Discord embed message
        from datetime import datetime
        
        # Truncate description if too long for Discord
        description = data.get('description', 'N/A')
        if len(description) > 1000:
            description = description[:997] + '...'
        
        additional = data.get('additional', '')
        if additional and len(additional) > 500:
            additional = additional[:497] + '...'
        
        embed = {
            "title": "🎉 Pesanan Website Baru!",
            "description": "Ada klien baru yang ingin membuat website!",
            "color": 65280,  # Green color
            "fields": [
                {"name": "👤 Nama", "value": data.get('name', 'N/A'), "inline": True},
                {"name": "🏢 Perusahaan/Brand", "value": data.get('company', 'N/A'), "inline": True},
                {"name": "📧 Email", "value": data.get('email', 'N/A'), "inline": False},
                {"name": "📱 Telepon/WhatsApp", "value": data.get('phone', 'N/A'), "inline": True},
                {"name": "💼 Jenis Layanan", "value": data.get('service', 'N/A'), "inline": True},
                {"name": "💰 Budget", "value": data.get('budget', 'N/A'), "inline": True},
                {"name": "⏰ Timeline", "value": data.get('timeline', 'N/A'), "inline": True},
                {"name": "📝 Deskripsi Proyek", "value": description, "inline": False},
            ],
            "footer": {
                "text": "Portfolio MHFADEV"
            },
            "timestamp": datetime.utcnow().isoformat()
        }
        
        if additional:
            embed["fields"].append({"name": "ℹ️ Info Tambahan", "value": additional, "inline": False})
        
        payload = {
            "embeds": [embed],
            "username": "MHFADEV Order Bot",
            "avatar_url": "https://cdn.discordapp.com/embed/avatars/0.png"
        }
        
        # Send to Discord webhook
        try:
            response = requests.post(webhook_url, json=payload, timeout=10)
            
            if response.status_code in [200, 204]:
                logging.info(f"Order sent to Discord successfully for {data.get('name')}")
                return jsonify({
                    'success': True,
                    'message': 'Pesanan berhasil dikirim! Kami akan segera menghubungi Anda.'
                }), 200
            else:
                logging.error(f"Discord webhook error: {response.status_code} - {response.text}")
                return jsonify({
                    'success': False,
                    'message': 'Gagal mengirim pesanan. Silakan coba lagi atau hubungi langsung.'
                }), 500
                
        except requests.exceptions.Timeout:
            logging.error("Discord webhook timed out")
            return jsonify({
                'success': False,
                'message': 'Koneksi timeout. Silakan coba lagi.'
            }), 500
        except requests.exceptions.RequestException as e:
            logging.error(f"Discord webhook request failed: {str(e)}")
            return jsonify({
                'success': False,
                'message': 'Gagal mengirim pesanan. Silakan coba lagi.'
            }), 500
            
    except Exception as e:
        logging.error(f"Error in submit_order: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Terjadi kesalahan pada server'
        }), 500


@app.route('/send-email', methods=['POST'])
def send_email():
    """Handle contact form submission and send email via SendGrid"""
    try:
        data = request.get_json()

        # Validate required fields
        if not all(key in data
                   for key in ['name', 'email', 'subject', 'message']):
            return jsonify({
                'success': False,
                'message': 'Semua field harus diisi'
            }), 400

        # Validate email format
        try:
            validate_email(data['email'])
        except EmailNotValidError as e:
            return jsonify({
                'success': False,
                'message': 'Email tidak valid'
            }), 400

        # Get recipient email from environment
        recipient_email = os.environ.get('RECIPIENT_EMAIL')
        if not recipient_email:
            logging.error('RECIPIENT_EMAIL not configured')
            return jsonify({
                'success': False,
                'message': 'Konfigurasi email tidak ditemukan'
            }), 500

        # Prepare email content
        subject = f"Portfolio Contact: {data['subject']}"
        text_content = f"""
Pesan baru dari portfolio website:

Nama: {data['name']}
Email: {data['email']}
Subjek: {data['subject']}

Pesan:
{data['message']}
        """

        html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #000, #333); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
        .content {{ background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #555; }}
        .value {{ color: #333; }}
        .message-box {{ background: white; padding: 15px; border-left: 4px solid #000; margin-top: 15px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Pesan Baru dari Portfolio Website</h2>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">Nama:</span><br>
                <span class="value">{data['name']}</span>
            </div>
            <div class="field">
                <span class="label">Email:</span><br>
                <span class="value">{data['email']}</span>
            </div>
            <div class="field">
                <span class="label">Subjek:</span><br>
                <span class="value">{data['subject']}</span>
            </div>
            <div class="message-box">
                <span class="label">Pesan:</span><br>
                <p class="value">{data['message']}</p>
            </div>
        </div>
    </div>
</body>
</html>
        """

        # Send email using Python SendGrid library (works in both Replit and Vercel)
        try:
            api_key, from_email = get_sendgrid_credentials()

            message = Mail(from_email=from_email,
                           to_emails=recipient_email,
                           subject=subject,
                           plain_text_content=text_content,
                           html_content=html_content)

            sg = SendGridAPIClient(api_key)
            response = sg.send(message)

            logging.info(f"Email sent successfully to {recipient_email}")
            
            # Also send to Discord webhook (non-blocking async)
            send_to_discord_async(data)
            
            return jsonify({
                'success': True,
                'message': 'Email berhasil dikirim'
            }), 200

        except ValueError as e:
            logging.error(f"SendGrid credentials error: {str(e)}")
            return jsonify({
                'success': False,
                'message': 'Konfigurasi email tidak ditemukan'
            }), 500
        except Exception as e:
            logging.error(f"Failed to send email: {str(e)}")
            return jsonify({
                'success': False,
                'message': 'Gagal mengirim email'
            }), 500

    except Exception as e:
        logging.error(f"Error in send_email: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Terjadi kesalahan pada server'
        }), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
