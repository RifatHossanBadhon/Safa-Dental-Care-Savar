document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic'
        });
    }
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navbar.classList.toggle('menu-active');
            const icon = mobileMenuBtn.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars-staggered');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars-staggered');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navbar.classList.remove('menu-active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars-staggered');
                }
            });
        });
    }
    const reviewTrack = document.getElementById('review-track');
    if (reviewTrack) {
        const reviewClone = reviewTrack.innerHTML;
        reviewTrack.innerHTML += reviewClone; 
        reviewTrack.innerHTML += reviewClone; 
    }
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatPanel = document.getElementById('chatPanel');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendBtn = document.getElementById('sendBtn');
    const chatInputBox = document.getElementById('chatInputBox');
    const chatMessages = document.getElementById('chatMessages');
    const timeNowElem = document.getElementById('timeNow');
    if (timeNowElem) {
        const now = new Date();
        timeNowElem.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function toggleChatPanel() {
        chatPanel.classList.toggle('active');
        if (chatPanel.classList.contains('active')) {
            chatToggleBtn.querySelector('i').classList.replace('fa-comment-dots', 'fa-xmark');
            setTimeout(() => chatInputBox.focus(), 300);
        } else {
            chatToggleBtn.querySelector('i').classList.replace('fa-xmark', 'fa-comment-dots');
        }
    }

    if (chatToggleBtn) chatToggleBtn.addEventListener('click', toggleChatPanel);
    if (closeChatBtn) closeChatBtn.addEventListener('click', toggleChatPanel);

    function handleSend() {
        const text = chatInputBox.value.trim();
        if (!text) return;
        const userDiv = document.createElement('div');
        userDiv.className = 'msg user-msg';
        userDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid fa-user"></i></div>
            <div class="bubble">${escapeHTML(text)}</div>
        `;
        chatMessages.appendChild(userDiv);
        
        chatInputBox.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'msg bot-msg';
            
            let replyText = "Thank you for reaching out! Please call us at 01778502806 for immediate assistance or booking.";
            const lText = text.toLowerCase();
            
            if (lText.includes('book') || lText.includes('appointment')) {
                replyText = "We'd love to see you! You can book an appointment by calling <strong>01778502806</strong> during our hours (Sat-Thu 4PM-9PM).";
            } else if (lText.includes('where') || lText.includes('location')) {
                replyText = "We are perfectly located next to Razzak Plaza, beside Super Hospital in Savar Bus Stand.";
            } else if (lText.includes('price') || lText.includes('cost') || lText.includes('fee')) {
                replyText = "Our treatments are highly affordable. However, exact pricing depends on a clinical evaluation. It's best to visit for a check-up!";
            } else if (lText.includes('hello') || lText.includes('hi')) {
                replyText = "Hello there! How can we make your smile brighter today?";
            }

            botDiv.innerHTML = `
                <div class="avatar"><i class="fa-solid fa-user-nurse"></i></div>
                <div class="bubble">${replyText}</div>
            `;
            chatMessages.appendChild(botDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1200);
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (chatInputBox) {
        chatInputBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    }
});
