/* jquery roundabout by jay ramirez
   May 5, 2014
*/

jQuery.fn.roundabout = function( options ) {
 	
 	var Self = this;
 	var Items = [],
        itemPos = {};


 	
 	this.next = function(){
 		var nextItem = Items[2] ? Items[2] : Items[Items.length-1];
 		
 		Items[0].css(itemPos.left);
 		Items[1].css(itemPos.center);
 		Items[Items.length-1].css(itemPos.back);
 		nextItem.css(itemPos.right);

 		Items.push(Items[0]);
 		Items.shift();

 		console.log(Items)

 		nextItem.bind('click',function(){
 			Self.next();
 		});
 		Items[Items.length-1].bind('click',function(){
 			Self.prev();
 		});

 	}

 	this.prev = function(){
 		var nextItem = Items[Items.length-2];
 		Items[1].css(itemPos.back);
 		Items[0].css(itemPos.right);
 		Items[Items.length-1].css(itemPos.center);
 		nextItem.css(itemPos.left);

 		Items.unshift(Items[Items.length-1]);
 		Items.pop();

 		console.log(Items)

 		nextItem.bind('click',function(){
 			Self.prev();
 		});
 		Items[1].bind('click',function(){
 			Self.next();
 		})
 	}

    this.init = function(){
        Items[0].css(itemPos.center);
        Items[1].css(itemPos.right)
        Items[Items.length-1].css(itemPos.left);
        
        for( i = 2; i< Items.length-1; i++){
            Items[i].css(itemPos.back);
        }
    }

    this.resized = function(){
        console.log(1)
        var el = $(Self[0]),
            parentWidth = el.width(),
            childWidth = Items[0].width();

        itemPos.center = {
            top: 0,
            width : childWidth,
            left : (parentWidth/2) - (childWidth/2),
            opacity: 1,
            zIndex : 999
        }

        itemPos.left = {
            top: '15%',
            left : 0,
            width : childWidth/2,
            opacity: 0.5,
            zIndex : itemPos.center.zIndex - 1
        }

        itemPos.right = {
            top: '15%',
            left : parentWidth - (childWidth/2),
            width : childWidth/2,
            opacity: 0.5,
            zIndex : itemPos.center.zIndex - 2
        }

        itemPos.back = {
            left : parentWidth/2 - 20,
            width : 40,
            top: '30%',
            opacity: 0,
            zIndex : itemPos.center.zIndex - 3
        }

        Self.init();
    }
 	

    return this.each(function() {
        var self = $(this),
            Window = $(window),
        	children = self.children(),
        	childCount = children.length;


        	children.each(function(){
        		var child = $(this);
        			Items.push(child)
        		child.css({position : 'absolute'})
        	})

        	
            Self.resized();
            Window.resize(function(){
                Self.resized()
            });

            setTimeout(function(){
                children.css({
                  transition: 'all 500ms'
                })
            },100);

    });
 
};