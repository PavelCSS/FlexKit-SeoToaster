$('.dropdown-btn').each(function(){
    var menu = $(this).data('menu'),
        height = $(this).data('menu-height'),
        position = $(this).data('menu-position'),
        type = $(this).data('menu-type'); // mobile or empty
    if(type !== 'mobile'){
        $(menu).addClass('dropdown-menu');
    }else{
        dropdownInit(menu);
        window.addEventListener('resize', function(){
            dropdownInit(menu);
        }, false);
    }
    $(menu).addClass(position).height(height);
});

function dropdownInit(menu){
    if(window.innerWidth <= 800){
        $(menu).addClass('dropdown-menu');
    }else{
        $(menu).removeClass('dropdown-menu');
    }
}

tapButton('menu-btn', showMenu);
tapButton('dropdown-btn', showDropdown);
tapButton('sub-menu-btn', function(e){
    event.stopPropagation();
    event.preventDefault();
    $(e.target).toggleClass('active').nextAll('ul').toggleClass('open');
});

var body = document.body;
$(body).on(events[0], hideMenu);

function hideMenu(e){
    if(e.target.hasAttribute('data-menu-open') || e.target.hasAttribute('data-dropdown-open')){
        e.preventDefault();
        e.stopPropagation();
        $('.dropdown-menu, .dropdown-menu-mobile').removeClass('open');
        $('.dropdown-btn, .menu-btn').removeClass('active');
        body.removeAttribute('data-menu-open');
        body.removeAttribute('data-dropdown-open');
    }
}

function showMenu(e){
    //    even.stopPropagation();
    e.preventDefault();
    var menuPosition = e.target.getAttribute('data-menu-position');
    body.setAttribute('data-menu-open', menuPosition);
    $(e.target).addClass('active');
}

function showDropdown(e){
    //    ev.stopPropagation();
    e.preventDefault();
    var menu = e.target.getAttribute('data-menu');
    $(menu).addClass('open');
    body.setAttribute('data-dropdown-open', '');
    $(e.target).addClass('active');
}

function tapButton(selector, fun){
    var listItems = document.getElementsByClassName(selector);
    if(!window.Hammer){
        for(var i = 0; i < listItems.length; i++){
            if (window.addEventListener) {
                listItems[i].addEventListener('click', fun, false);
            } else if (window.attachEvent) {
                listItems[i].attachEvent('click', fun, false);
            }
        }
    }else{
        Hammer.each(listItems, function(item){
            var touchControl = new Hammer(item);
            touchControl.on("tap", fun);

        });
    }
}