var myFeature = {
  'config' : {
    // default container is #myFeature
    'container' : $('#myFeature')
},

  'init' : function(config) {
      // provide for custom configuration via init()
      if (config && typeof(config) == 'object') {
          $.extend(myFeature.config, config);
      }

      // create and/or cache some DOM elements
      // we'll want to use throughout the code
      myFeature.$container = myFeature.config.container;

      myFeature.$sections = myFeature.$container.
          // only select immediate children!
          find('ul.sections > li');

      myFeature.$section_nav = $('<p/>')
        .attr('id','section_nav')
        .prependTo(myFeature.$container);

      myFeature.$item_nav = $('<p/>')
        .attr('id','item_nav')
        .insertAfter(myFeature.$section_nav);

      myFeature.$content = $('<p/>')
        .attr('id','content')
        . insertAfter(myFeature.$item_nav);

    // build the section-level nav and
    // "click" the first item
    myFeature.buildSectionNav(myFeature.$sections);
    myFeature.$section_nav.find('li:first').click();

    // hide the plain HTML from sight
    myFeature.$container.find('ul.sections').hide();

    // make a note that the initialization
    // is complete; we don't strictly need this
    // for this iteration, but it can come in handy
    myFeature.initialized = true;
  },

  'buildSectionNav' : function($sections) {

    // iterate over the provided list of sections
    $sections.each(function() {

        // get the section
        var $section = $(this);

        // create a list item for the section navigation
        $('<li/>')
          // use the text of the first h2
          // in the section as the text for
          // the section navigation
          .text($section.find('h2:first').text())

          // add the list item to the section navigation
          .appendTo(myFeature.$section_nav)

          // use data() to store a reference
          // to the original section on the
          // newly-created list item
          .data('section', $section)

          // bind the click behavior
          // to the newly created list itme
          // so it will show the section
          .click(myFeature.showSection);
    });
  },
  'buildItemNav' : function($items) {
    // iterate over the provided list of items
    $items.each(function() {

    // get the item
    var $item = $(this);

    // create a list item element for the
    // item navigation
    $('<li>')

      // use the text of the first h3
      // in the item as the text for the
      // item navigation
      .text($item.find('h3:first').text())

      // add the list item to the item navigation
      .appendTo(myFeature.$item_nav)

      // use data to store a reference
      // to the original item on the
      // newly created list item
      .data('item', $item)

      // bind the click behavior to the
      // newly created list item so it will
      // show the content item
      .click(myFeature.showContentItem);

    });
  },
  'showSection' : function() {
    // capture the list item that was clicked on
    var $li = $(this);

    // clear out the left nav and content area
    myFeature.$item_nav.empty();
    myFeature.$content.empty();

    // get the jQuery section object from the orginal HTML,
    // which we stored using data() during buildSectionNav
    var $section = $li.data('section');

    // mark the clicked list item as current
    // and remove the current marker from its siblings
    $li.addClass('current')
      .siblings().removeClass('current');

    // find all of the items related to the section
    var $items = $section.find('ul li');

    // build the item nav for the section
    myFeature.buildItemNav($items);

    // "click" on the first list item in the section's item nav
    myFeature.$item_nav.find('li:first').click();

  },

  'showContentItem' : function() {
    var $li = $(this);

    // mark the clicked list item as current
    // and revmoe the current marker from its siblings
    $li.addClass('current')
      .siblings().removeClass('current');

    // get the jQuery item object from the original HTML,
    // which we stored using data during buildContentNav
    var $item = $li.data('item');

    // use the item's HTML to populate the content area
    myFeature.$content.html($item.html());
  }
}

$(document).ready(myFeature.init);
