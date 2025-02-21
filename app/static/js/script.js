$(document).ready(function() {
    let updateInterval = 30000;
    
    function updateCounters() {
        $.get('/api/counters', function(data) {
            $('#main-title').text(data.title);
            $('#counter-container').empty();
            
            data.counters.forEach(counter => {
                const box = $(`
                    <div class="counter-box" data-platform="${counter.platform}">
                        <h3>${counter.label || counter.platform}</h3>
                        <div class="count">${formatNumber(counter.count)}</div>
                    </div>
                `);
                $('#counter-container').append(box);
            });
            
            initSortable();
        });
    }

    function initSortable() {
        $("#counter-container").sortable({
            update: function(event, ui) {
                const newOrder = Array.from($("#counter-container .counter-box")).map(box => $(box).data('platform'));
                $.post('/api/config/order', JSON.stringify({order: newOrder}), {
                    contentType: 'application/json'
                });
            }
        });
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Initial load
    updateCounters();
    setInterval(updateCounters, updateInterval);

    // Settings button click handler
    $('#settings-btn').click(showSettingsModal);
});
