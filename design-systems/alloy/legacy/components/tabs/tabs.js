document.querySelectorAll('.drp-tab-contained-container[data-tabgroup]').forEach(function(tabBar) {
  var groupId = tabBar.dataset.tabgroup;
  var items = tabBar.querySelectorAll('.drp-tab-contained-tab-container-bg');
  items.forEach(function(item) {
    item.addEventListener('click', function() {
      // Update tabs
      items.forEach(function(i) {
        i.classList.remove('is-selected');
        i.setAttribute('aria-selected', 'false');
      });
      item.classList.add('is-selected');
      item.setAttribute('aria-selected', 'true');

      // Update panels
      var panelId = item.dataset.panel;
      if (panelId) {
        document.querySelectorAll('[data-tabgroup-panel="' + groupId + '"]').forEach(function(p) {
          p.classList.remove('is-active');
        });
        var target = document.getElementById(panelId);
        if (target) target.classList.add('is-active');
      }
    });
  });
});
