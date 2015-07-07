#jQuery-Easy-Label

This JS allows you to add removable sticky label (with cookie state check)into your form or web page.

This comes in handy if you want to show some informative or help text to your user which once they have read (by clicking Remove button)
, they should not be prompted to show the same text anymore.

Include the **easy.stickypost.css** and **easy.stickypost.js** after the jquery.js file.
Specify a data attribute **data-stickyid="xx"** to any HTML object that you wants it to be Removable.

See demo/demo.html file for a simple demo. Some configuration can be done:
 - Specifying the Color (e.g. 'color': 'orange' as parameter)
 - Specifying your own Delete button. HTML support
 - Changing the Tooltip text when hover.
 - Specifying a label which is removable and Always show.

e.g.

    $("#tips1").stickypost({'tooltip': 'alamak','pin': '<span>x</span>'});
	$("#tips2").stickypost({
	  'cached':false,
	  'tooltip': 'Click here to close it temporarily',
	  'pin': '<img src="https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/128/delete.png" height="16" width="16"/>',
	  'color': 'orange'
	  });


HTML
```html
<p data-stickyid="1">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rutrum nibh ut rhoncus congue. Interdum et malesuada fames ac ante ipsum primis in faucibus.
</p>
<p data-stickyid="2">
    Nulla nec egestas enim. Donec porttitor, quam cursus faucibus facilisis, magna ex condimentum ipsum, a sagittis nulla libero ac velit. Nunc scelerisque arcu eleifend, pellentesque lectus et, porta urna.
</p>
<p data-stickyid="3">
    Aliquam fringilla, dolor ut gravida porttitor, urna risus auctor libero, eget dapibus ante sem et ante. Proin erat orci, pulvinar ac tincidunt a, blandit a risus.
</p>
```
The **data-stickyid** is used as cookie cache checking. Avoid using the same ID.

Refer to demo here [http://wp.ahcheng.com/wp-content/uploads/jQuery%20Easy%20Label/demo/demo.html](http://wp.ahcheng.com/wp-content/uploads/jQuery%20Easy%20Label/demo/demo.html)
