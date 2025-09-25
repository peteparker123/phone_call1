# Peer-to-Peer Audio Chat Application

A real-time audio chat application built with WebRTC and PeerJS that enables direct peer-to-peer communication without the need for a central server relay.

## 🚀 Features

- **Real-time Audio Communication**: Direct peer-to-peer audio calls
- **No Central Server**: Communication happens directly between peers
- **Simple Interface**: Easy-to-use web interface
- **Device ID System**: Each device gets a unique ID for connections
- **Browser Compatible**: Works in modern web browsers
- **PWA Support**: Progressive Web App features with service worker

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **WebRTC**: PeerJS library for peer-to-peer connections
- **Real-time Communication**: WebSocket connections
- **PWA**: Service Worker for offline capabilities

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Modern web browser with WebRTC support
- Microphone access permissions

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/peer-to-peer-audio-chat.git
   cd peer-to-peer-audio-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:8000`

## 🎯 How to Use

1. **Start the Application**
   - Run `npm start` to start the server
   - Open `http://localhost:8000` in your browser

2. **Get Your Device ID**
   - Your unique device ID will be displayed on the page
   - Share this ID with the person you want to call

3. **Make a Call**
   - Click the "Call" button
   - Enter the other person's device ID when prompted
   - Allow microphone access when requested

4. **Answer a Call**
   - When someone calls you, you'll get a confirmation dialog
   - Click "OK" to accept the call
   - Click "Cancel" to reject it

5. **During the Call**
   - Use the audio controls to manage your microphone
   - Click "Hang up" to end the call

## 🌐 Deployment

### Deploy to Render

1. **Push to GitHub** (see instructions below)

2. **Create Render Account**
   - Go to [Render.com](https://render.com)
   - Sign up or log in

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select this repository

4. **Configure Deployment**
   - **Name**: `peer-to-peer-audio-chat`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose your preferred plan)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

## 📁 Project Structure

```
peer-to-peer-audio-chat/
├── index.html          # Main HTML file
├── index.css           # Styles
├── script.js           # Client-side JavaScript
├── server.js           # Express server with PeerJS
├── package.json        # Node.js dependencies
├── manifest.webmanifest # PWA manifest
├── pwabuilder-sw.js    # Service worker
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## 🔒 Security Considerations

- **HTTPS Required**: For production, use HTTPS to enable microphone access
- **Firewall Settings**: Ensure WebRTC ports are open
- **Browser Permissions**: Users must grant microphone access
- **Network Configuration**: May require STUN/TURN servers for complex networks

## 🐛 Troubleshooting

### Common Issues

1. **"Microphone not accessible"**
   - Ensure HTTPS is used in production
   - Check browser permissions
   - Try refreshing the page

2. **"Connection failed"**
   - Check if both devices are online
   - Verify device IDs are correct
   - Check firewall settings

3. **"No audio heard"**
   - Check browser audio settings
   - Ensure microphone is not muted
   - Test with headphones to avoid feedback

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Lola Odelola**

## 🙏 Acknowledgments

- [PeerJS](https://peerjs.com/) for the WebRTC wrapper
- [Express.js](https://expressjs.com/) for the web server
- WebRTC community for documentation and examples

---

**Note**: This application works best when both users are on the same network or when deployed to a server with proper STUN/TURN configuration for cross-network communication.