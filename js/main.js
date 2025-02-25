// Function to update the display
async function updateDisplay() {
    console.log('Updating display...');
    try {
        const response = await fetch('/getLatestData');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const display = document.getElementById('display');
        display.innerHTML = '';

        if (data.length === 0) {
            display.innerHTML = '<p>No data available.</p>';
            return;
        }

        data.forEach(item => {
            const box = document.createElement('div');
            box.className = 'info-box';
            box.innerHTML = `
                <img src="/assets/icons/facebook.png" alt="Facebook Logo">
                <h2>${item.name}</h2>
                <p>ID: ${item.id}</p>
                ${item.category ? `<p>Category: ${item.category}</p>` : ''}
                ${item.checkins ? `<p>Checkins: ${item.checkins}</p>` : ''}
                <p>Fan Count: ${item.fan_count}</p>
                ${item.followers_count ? `<p>Followers Count: ${item.followers_count}</p>` : ''}
                <p>Talking About Count: ${item.talking_about_count}</p>
                <p>Were Here Count: ${item.were_here_count}</p>
                ${item.ad_campaign ? `<p>Ad Campaign: ${item.ad_campaign}</p>` : ''}
                ${item.instagram_accounts ? `<p>Instagram Accounts: ${item.instagram_accounts}</p>` : ''}
                ${item.instagram_business_account ? `<p>Instagram Business Account: ${item.instagram_business_account}</p>` : ''}
                ${item.is_eligible_for_branded_content ? `<p>Eligible for Branded Content: ${item.is_eligible_for_branded_content}</p>` : ''}
                ${item.link ? `<p>Link: <a href="${item.link}" target="_blank">${item.link}</a></p>` : ''}
                ${item.does_viewer_have_page_permission_link_ig ? `<p>Viewer Page Permission Link (IG): ${item.does_viewer_have_page_permission_link_ig}</p>` : ''}
                ${item.overall_star_rating ? `<p>Overall Star Rating: ${'<i class="fas fa-star"></i>'.repeat(Math.round(item.overall_star_rating))}</p>` : ''}
                ${item.unread_notif_count ? `<p>Unread Notification Count: ${item.unread_notif_count}</p>` : ''}
                ${item.unread_message_count ? `<p>Unread Message Count: ${item.unread_message_count}</p>` : ''}
                ${item.unseen_message_count ? `<p>Unseen Message Count: ${item.unseen_message_count}</p>` : ''}
            `;
            display.appendChild(box);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        const display = document.getElementById('display');
        display.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}

// Refresh icon functionality
document.getElementById('refreshIcon').addEventListener('click', () => {
    console.log('Refresh icon clicked'); // Debugging: Log when the refresh icon is clicked
    updateDisplay();
});

// Initial data fetch
updateDisplay();