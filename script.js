/**
 * VARIABLES
 */

/**
 * Instantiate a new Peer, passing to it an alphanumeric string as an ID and options obj
 * @type {Peer}
 */
const peer = new Peer(''+Math.floor(Math.random()*2**18).toString(36).padStart(4,0), {
    host: location.hostname,
    port: location.port || 8000,
    debug: 1,
    path: '/myapp'
});

window.peer = peer;

const callBtn = document.querySelector('.call-btn');
const audioContainer = document.querySelector('.call-container');
const hangUpBtn = document.querySelector('.hangup-btn');

let conn;
let code;

/**
 * FUNCTIONS
 */

/**
 * Gets connection code/peer id from caller
 * @returns {string} - the code retrieved
 */
function getStreamCode() {
    code = window.prompt('Please enter the sharing code');
    return code;
}

/**
 * Gets the local audio stream of the current caller
 * @param callbacks - an object to set the success/error behaviour
 * @returns {void}
 */

function getLocalStream() {
    const constraints = {video: false, audio: true}

    navigator.mediaDevices.getUserMedia(constraints).then( stream => {
        setLocalStream(stream);
    }).catch( err => {
        console.log("u got an error:" + err)
    });
}

/**
 * Sets the src of the HTML element on the page to the local stream
 * @param stream
 * @returns {void}
 */

function setLocalStream(stream) {
    const localAudio = document.getElementById('localAudio');
    if (localAudio) {
        localAudio.srcObject = stream;
        localAudio.autoplay = true;
    }
    window.localStream = stream;
}

/**
 * Sets the src of the HTML element on the page to the remote stream
 * @param stream
 * @returns {void}
 */
function setRemoteStream(stream) {
    const remoteAudio = document.getElementById('remoteAudio');
    if (remoteAudio) {
        remoteAudio.srcObject = stream;
        remoteAudio.autoplay = true;
    }
    window.peerStream = stream;
}

/**
 * Displays the audio controls and correct copy
 * @returns{void}
 */
function showConnectedContent() {
    const castStatus = document.getElementById('caststatus');
    if (castStatus) {
        castStatus.textContent = `You're connected`;
    }
    callBtn.hidden = true;
    audioContainer.hidden = false;
}

/**
 * Displays the call button and peer ID
 * @returns{void}
 */
function showCallContent() {
    const castStatus = document.getElementById('caststatus');
    if (castStatus) {
        castStatus.textContent = `Your device ID is: ${peer.id}`;
    }
    callBtn.hidden = false;
    audioContainer.hidden = true;
}

/**
 * Connect the peers
 * @returns {void}
 */

function connectPeers() {
    conn = peer.connect(code)
}

/**
 * EVENTS
 */

/**
 * Get the connection code, connect peers and create a call
 */
callBtn.addEventListener('click', function(){
    getStreamCode();
    connectPeers();
    const call = peer.call(code, window.localStream);
    /**
     * when the call is streaming, set the remote stream for the caller
     */
    call.on('stream', function(stream) {
        setRemoteStream(stream);
        showConnectedContent();
    });
})

/**
 * Close the connection between peers
 */
hangUpBtn.addEventListener('click', function (){
    conn.close();
    showCallContent();
})

/**
 * When the peer has connected to the server, diplay the peer ID
 */
peer.on('open', function (id) {
    console.log('Peer opened with ID:', id);
    console.log('Peer object ID:', peer.id);
    const castStatus = document.getElementById('caststatus');
    if (castStatus) {
        castStatus.textContent = `Your device ID is: ${id}`;
        console.log('Updated caststatus element with ID:', id);
    } else {
        console.error('caststatus element not found!');
    }
});

/**
 * When a data connection between peers is open, get the connecting peer's details
 */
peer.on('connection', function(connection){
    conn = connection;
    peer_id = connection.peer;
});

/**
 * When a call has been created, answer it and set the remote stream for the person being called
 */
peer.on('call', function(call) {

    const answerCall = confirm("Do you want to answer?")

    if(answerCall){
        call.answer(window.localStream)
        showConnectedContent();
        call.on('stream', function(stream) {
            setRemoteStream(stream);
        });
        conn.on('close', function (){
            showCallContent();
        })
    } else {
        console.log("call denied");
    }
});

/**
 * Log errors to the console when they occur
 */
peer.on('error', err => {
    console.error('PeerJS Error:', err);
    const castStatus = document.getElementById('caststatus');
    if (castStatus) {
        castStatus.textContent = `Connection error: ${err.message || err}`;
    }
});

// Add DOM content loaded event to ensure elements are available
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    const castStatus = document.getElementById('caststatus');
    if (castStatus) {
        console.log('caststatus element found:', castStatus);
        if (peer.id) {
            castStatus.textContent = `Your device ID is: ${peer.id}`;
        } else {
            castStatus.textContent = 'Connecting...';
        }
    } else {
        console.error('caststatus element not found in DOM!');
    }
});

getLocalStream();