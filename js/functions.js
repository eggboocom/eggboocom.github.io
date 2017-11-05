$(document).on('ready', function () {



    if ($( "#main_header_wrapper_internas" ).length){
         var menu_principal_interno = $('#menu-desplegable').MenuDesplegableHome($('#main_header_wrapper_internas > .mdi-menu'), {
            backgroundClasses: 'gradient-01'
        });
    }
    else{
           var menu_principal_home = $('#menu-desplegable').MenuDesplegableHome($('#main_header_wrapper_home > .mdi-menu'), {
            backgroundClasses: 'gradient-01'
        });

    }
    setTimeout(showMenu, 700);

    function showMenu (){

        $( "#menu-desplegable").show();

    }

    var page_title = $('#page-title').each(function () {
        $(this).PageTitle();
    });

    StartModules();
    var $animatedOnScroll = $('.animated-on-scroll');
    var $animatedBg = $('.bg-animate');
    $(window).on('scroll', function (e) {
        var wScrollTop = $(window).scrollTop() + $(window).height();

        $animatedOnScroll.each(function () {
            if (isScrolledIntoView($(this))) {

                if ($(this).attr('id') == 'map-home'){

                    $(this).removeClass('animated-on-scroll');
                    $(this).addClass('scrolled');

                    setTimeout(function(){$(this).addClass('bounce'); $(this).addClass('animated-bounce');}, 300)

                }
                else{
                    $(this).removeClass('inactive');
                    $(this).trigger('scrolled');
                }


            }
        });



    });


    var winheight = $(window).height();
    var fullheight = $(document).height();

    $(window).scroll( function (e) {
        //var wScrollTop = $(window).scrollTop() + $(window).height();
        var wintop = $(window).scrollTop(); // calculate distance from top of window
        if (wintop > 200){
           $('#main_header_wrapper_home').addClass('menu-border-scroll');
           $('#main_header_wrapper_home').removeClass('menu-border-scroll-none');
        }
        else{
            $('#main_header_wrapper_home').addClass('menu-border-scroll-none');
            $('#main_header_wrapper_home').removeClass('menu-border-scroll');

        }
        $animatedOnScroll.each(function () {
            $elm = $(this);
            topcoords = $elm.offset().top; // element's distance from top of page in pixels
             if(wintop > (topcoords - (winheight*.75))) {
                    if ($(this).attr('id') == 'lines-viajar'){

                        $(this).removeClass('animated-on-scroll');
                        $(this).addClass('scrolled');

                        $(this).addClass('fadeInLeftLine');
                        $(this).addClass('fadeInRightLine');

                        var array_text = new Array()
                        $('.empieza-viajar .st0').each(function (index) {
                                elm = $(this);
                                array_text[index] = elm;

                        });


                        setTimeout(function() {
                            $.each(array_text, function (key, value) {
                                    elm = value;
                                    delay = ( key < 10) ? "." + (key) + "s"
                                                        : ( key < 20)  ?    "1." + (key-10) + "s"
                                                                       :    "2." + (key-20) + "s";

                                    elm.css('transition-delay', delay);
                                    elm.css('opacity','1');
                            });
                        }, 2000);

                        //setTimeout( function () {$('#viajar-container').css('opacity','1');},2000);
                    }
                    else if ($(this).attr('id') == 'map-home'){

                        $(this).removeClass('animated-on-scroll');
                        $(this).addClass('scrolled');

                        //setTimeout(function(){$(this).addClass('bounce'); $(this).addClass('animated-bounce');}, 1000);
                        $(this).addClass('bounce'); $(this).addClass('animated-bounce');

                    }
                    else if ($(this).attr('id') == 'conducir-inscripcion'){

                        $(this).removeClass('animated-on-scroll');
                        $(this).addClass('scrolled');

                         var array_text = new Array()
                        $('.comenzar .st0').each(function (index) {
                                elm = $(this);
                                array_text[index] = elm;

                        });


                        setTimeout(function() {
                            $.each(array_text, function (key, value) {
                                    elm = value;
                                    delay = ( key < 10) ? "." + (key) + "s"
                                                        : ( key < 20)  ?    "1." + (key-10) + "s"
                                                                       :    "2." + (key-20) + "s";

                                    elm.css('transition-delay', delay);
                                    elm.css('opacity','1');
                            });
                        }, 10);

                    }
                    else if ($(this).attr('id') == 'nosotros-empeza'){

                        $(this).removeClass('animated-on-scroll');
                        $(this).addClass('scrolled');

                         var array_text = new Array()
                        $('.empeza .st0').each(function (index) {
                                elm = $(this);
                                array_text[index] = elm;

                        });


                        setTimeout(function() {
                            $.each(array_text, function (key, value) {
                                    elm = value;
                                    delay = ( key < 10) ? "." + (key) + "s"
                                                        : ( key < 20)  ?    "1." + (key-10) + "s"
                                                                       :    "2." + (key-20) + "s";

                                    elm.css('transition-delay', delay);
                                    elm.css('opacity','1');
                            });
                        }, 10);

                    }
                    else{
                        $(this).removeClass('animated-on-scroll');
                        $(this).removeClass('inactive');
                        $(this).addClass('scrolled');
                    }

            }
        });

        $animatedBg.each(function () {
            $elm = $(this);
            topcoords = $elm.offset().top; // element's distance from top of page in pixels

            if(wintop > (topcoords - (winheight*.5))) {

                $(this).removeClass('bg-animate');
                $(this).addClass('fadeInLeftBg');


            }
        });


    });
    //menu_principal_home.background.addClass('gradient-01');
});
$.fn.extend({
    MenuDesplegableHome: function (trigger_button, options) {
        var _this = this;
        button = $('#menu-btn');
        options = (typeof options !== 'undefined') ? options : {};
        _this.default_options = {
            'backgroundClasses': '',
            'backgroundColor': 'white'
        };
        _this.options = $.merge(options, _this.default_options);
        _this.trigger = trigger_button;
        _this.background;

        _this.init = function () {
            _this.structure();
            _this.styles();
            _this.events();
        };
        _this.structure = function () {
            _this.wrap('<div class="menu-desplegable"></div>');
            _this.wrapper = _this.parent();
            _this.wrapper.prepend('<div class="background"></div>');
            _this.background = _this.wrapper.find('.background');
        };
        _this.styles = function () {
            _this.wrapper.css({
                'height': $(window).height(),
                'z-index': 1001
            });
            _this.trigger.css({
                'z-index': 1001

            });
            _this.setup_background_styles();
        };
        _this.events = function () {
            _this.trigger.on('click', function (e) {
                e.preventDefault();
                _this.wrapper.toggleClass('visible');
                if (_this.wrapper.hasClass('visible')) {
                    $('body').width($(window).width()).height($(window).height()).css('overflow', 'hidden');

                    setTimeout(function() {button.addClass('close-menu');}, 100);
                    _this.activate_menu_items();
                } else {
                    $('body').width('auto').height('auto').css('overflow', 'auto');
                    setTimeout(function() {button.removeClass('close-menu');},400);
                    _this.deactivate_menu_items();
                }

            });
            $(window).on('resize', function () {
                _this.styles();
            });
            $(document).keyup(function(e) {
                 if (e.keyCode == 27) {
                    if (_this.wrapper.hasClass('visible')) {
                        _this.wrapper.toggleClass('visible');
                        $('body').width('auto').height('auto').css('overflow', 'auto');
                        setTimeout(function() {button.removeClass('close-menu');},400);
                        _this.deactivate_menu_items();
                    }

                }
            });
        };
        _this.setup_background_styles = function () {
            var background_width = Math.sqrt(Math.pow($(window).width(), 2) + Math.pow($(window).height(), 2))+100;
            _this.background.css({
                backgroundColor: _this.options.backgroundColor,
                width: background_width,
                height: $(window).height()
            }).addClass(_this.options.backgroundClasses);
        };
        _this.activate_menu_items = function () {
            var menu_items = _this.find('li');
            var step = 150;
            menu_items.each(function (index) {
                var item = $(this);
                var timeout = setTimeout(function () {
                    item.addClass('active');
                }, (150 + (step * index)));
            });
        };
        _this.deactivate_menu_items = function () {
            var menu_items = _this.find('li');
            menu_items.each(function (index) {
                $(this).removeClass('active');
            });
        };
        _this.init();
        return _this;
    },
    MenuDesplegableInternas: function () {

    },
    PageTitle: function () {
        var _this = this;
        _this.$title = _this.children('h1');

        _this.main = function () {
            _this.s = Snap(240, 140);
            $(_this.s.node).css({
                position: 'fixed',
                top: 0,
                left: 0,
                'z-index': 1002
            });
            _this.load();
        };
        _this.load = function () {
            var title_w, title_h;
            title_w = _this.outerWidth() + 20;
            title_h = 62;
            _this.menu_activator = _this.s.rect(0, 0, 62, 62);
            _this.menu_activator.attr({
                'fill-opacity': 0
            });

            $(_this.menu_activator.node).css({
                cursor: 'pointer'
            }).off('click').on('click', function () {
                _this.siblings('.mdi-menu').trigger('click');
            });

            _this.titlewrapper = _this.s.polygon(CSnap.Parallelogram(title_w, title_h, -15, 0, 62 + title_h));
            _this.titlewrapper.attr({
                fill: '#FFCF4A'
            });

            _this.titlewrapper.points = CSnap.helpers.parsePoints(_this.titlewrapper.attr('points'));
            _this.joiner = _this.s.polygon(62, 0, _this.titlewrapper.points[2].x, _this.titlewrapper.points[2].y, _this.titlewrapper.points[1].x, _this.titlewrapper.points[1].y, 62, 62);
            _this.joiner.attr({
                fill: '#E8A81A'
            });
            _this.s.append(_this.titlewrapper);

            var text_x, text_y;
            text_x = 0;
            text_y = _this.titlewrapper.points[3].y + 31;
            text = _this.$title.text().split("**");

            _this.title = _this.s.text(text_x, text_y + 5, text[0]);
            $(_this.title.node).css({
                position: 'relative',
                margin: '0',
                padding: '0 20px',
                'line-height': '62px',
                'font-weight': '100',
                'font-size': '1.8em',
                'font-style': 'italic',
                'color': 'black',
                transform: 'rotate(-15deg)'
            });
            if (text[1]){
                this.titlebold = _this.s.text(text_x+(text[0].length*11)+2, text_y + 5, text[1]);
                $(_this.titlebold.node).css({
                    position: 'relative',
                    margin: '0',
                    padding: '0 20px',
                    'line-height': '62px',
                    'font-weight': '100',
                    'font-size': '1.8em',
                    'font-style': 'italic',
                    'font-weight': 'bold',
                    'color': 'black',
                    transform: 'rotate(-15deg)'
                });
                 _this.s.append(this.titlebold);
             }
//            _this.$title.css({
//                'z-index': 1003,
//                transform: 'rotate(-16deg)'
//            });
//            _this.$title.css({
//                top: _this.title.getBBox().y
//            });
        };
        _this.main();
        return _this;
    }
});
$.fn.extend({
    //OBJECTS
    TaxisUnClick: function () {
        var _this = this;

        _this.s;
        _this.c = {};
        _this.defs = {};

        _this.$text = _this.children('.text-container');

        _this.main = function () {
            _this.s = Snap('100%', 500);
            _this.prepend(_this.s.node);

            _this.prepare();
            _this.load();
            _this.gEvents();

        };
        _this.prepare = function () {
            _this.defs.id="test";
            _this.defs.center = CSnap.SnapElementDefinitions({
                file: 'resources/Ribbon01-center.svg',
                transformations: {}
            });
            _this.defs.left = CSnap.SnapElementDefinitions({
                width: 'WW_150',
                height: 62,
                degree: 10,
                attributes: {
                    fill: '#fad048'
                }
            });
            _this.defs.right = CSnap.SnapElementDefinitions({
                width: "WW_150",
                height: 62,
                degree: 10,
                attributes: {
                    fill: '#fad048'
                }
            });
            _this.defs.mobile = CSnap.SnapElementDefinitions({
                width: '180',
                height: '372',
                file: 'resources/eggboo-iphone.png',

            });
        };
        _this.load = function () {
            var loader = CSnap.SVGLoader();

            loader.add('center', _this.defs.center.getFile());
            loader.add('mobile', _this.defs.mobile.getFile());
            loader.load();
            loader.e.on('loaded', function () {
                _this.place_elements(loader.get_elements());
            });
        };
        _this.place_elements = function (loaded) {

            _this.c.ribbon = _this.s.g();
            _this.c.ribbon.attr({
                id: 'ribbon-group'
            });

            _this.s.append(loaded.center);
            _this.c.center = _this.s.select('#center_ribbon');

            var left_hook = CSnap.helpers.parsePoints(_this.c.center.select('polygon:nth-child(1)').attr('points'));
            var right_hook = CSnap.helpers.parsePoints(_this.c.center.select('polygon:nth-child(2)').attr('points'));
            var center_hook = CSnap.helpers.parsePoints(_this.c.center.select('polygon:nth-child(3)').attr('points'));

            var translationX = _this.defs.mobile.getWidth() + 20;
            var translationY = (_this.defs.mobile.getHeight() - _this.c.center.getBBox().h) / 2;

            _this.c.mobile = _this.s.image(_this.defs.mobile.getFile(), -translationX, -translationY, _this.defs.mobile.getWidth(), _this.defs.mobile.getHeight());


            left_hook[0].x = parseFloat(left_hook[0].x);
            parallelogram = CSnap.Parallelogram(
                    -(_this.defs.left.getWidth()),
                    -(_this.defs.left.getHeight()),
                    -(_this.defs.left.getDegree()),
                    left_hook[0].x,
                    left_hook[0].y
                    );

            parallelogram1 = parallelogram.slice();

            parallelogram[0] = parseFloat(parallelogram[2]) ;
            parallelogram[1] = parseFloat(parallelogram[3]) ;

            parallelogram[6] = parseFloat(parallelogram[4]);
            parallelogram[7] = parseFloat(parallelogram[5]);


            _this.c.left = _this.s.polygon(parallelogram);


            //leftEndPoints = parallelogram1.toString();

            Snap.plugin( function( Snap, Element, Paper, global ) {
              Element.prototype.polyAnimate = function( destPoints, duration, easing, callback ) {
                var poly = this;
                Snap.animate( this.attr('points'), destPoints,
                   function( val ){ poly.attr({ points: val }) }, duration, easing, callback)
                };
            });


            _this.c.left.attr(_this.defs.left.getAttributes());

            poligon1_anim = function(){
            _this.c.left.polyAnimate( parallelogram1, 1000, mina.linear, function() { })

            }

            // FIN FORMA 1

            parallelogram_right = CSnap.Parallelogram(
                    (_this.defs.right.getWidth()),
                    (_this.defs.right.getHeight()),
                    -(_this.defs.right.getDegree()),
                    right_hook[0].x,
                    right_hook[0].y
                    );

            parallelogram_right1 = parallelogram_right.slice();
            parallelogram_right[2] = parseFloat(parallelogram_right[0]) ;
            parallelogram_right[3] = parseFloat(parallelogram_right[1]) ;

            parallelogram_right[4] = parseFloat(parallelogram_right[6]);
            parallelogram_right[5] = parseFloat(parallelogram_right[7]);

            _this.c.right = _this.s.polygon(parallelogram_right);

            // FIN FORMA 2

            _this.c.right.attr(_this.defs.right.getAttributes());
            poligon2_anim = function(){
            _this.c.right.polyAnimate( parallelogram_right1, 1000, mina.linear, function() { })

            }



            center_pol_1 = _this.c.center.select('polygon:nth-child(1)');
            center_pol_points_orig = _this.c.center.select('polygon:nth-child(1)').attr('points');
            center_pol_points_orig.splice(-1,1);
            center_pol_points_orig_copy = center_pol_points_orig.slice();

            center_pol_points_orig[2]=center_pol_points_orig[4];
             _this.c.center.select('polygon:nth-child(1)').attr('points', center_pol_points_orig);

            poligon3_anim = function(){
                center_pol_1.polyAnimate( center_pol_points_orig_copy, 100, mina.linear, function() { })

            }



            center_pol_2 = _this.c.center.select('polygon:nth-child(3)');
            center_pol_2_points_orig = _this.c.center.select('polygon:nth-child(3)').attr('points');
            center_pol_2_points_orig.splice(-1,1);


            center_pol_2_points_orig_copy = center_pol_2_points_orig.slice();

            center_pol_2_points_orig[0]=center_pol_2_points_orig[2];
            center_pol_2_points_orig[1]=center_pol_2_points_orig[3];
            center_pol_2_points_orig[6]=center_pol_2_points_orig[4];
            center_pol_2_points_orig[7]=center_pol_2_points_orig[5];

            _this.c.center.select('polygon:nth-child(3)').attr('points', center_pol_2_points_orig);


            poligon4_anim = function(){
                center_pol_2.polyAnimate( center_pol_2_points_orig_copy, 150, mina.linear, function() { })

            }


            center_pol_3 = _this.c.center.select('polygon:nth-child(2)');
            center_pol_3_points_orig = _this.c.center.select('polygon:nth-child(2)').attr('points');
            center_pol_3_points_orig.splice(-1,1);

            center_pol_3_points_orig_copy = center_pol_3_points_orig.slice();

            center_pol_3_points_orig[4]=center_pol_3_points_orig[2];

            _this.c.center.select('polygon:nth-child(2)').attr('points', center_pol_3_points_orig);


            poligon5_anim = function(){
                center_pol_3.polyAnimate( center_pol_3_points_orig_copy, 150, mina.linear, function() { })

            }

            var array_text = new Array()
            $('#center_ribbon text').each(function (index) {
                    elm = $(this);
                    array_text[index] = elm;

            });

            poligon1_anim();
            setTimeout(function() {poligon3_anim();}, 1000);
            setTimeout(function() {poligon4_anim();}, 1100);
            setTimeout(function() {poligon5_anim();}, 1350);
            setTimeout(function() {poligon2_anim();}, 1500);
            setTimeout(function() {
                $.each(array_text, function (key, value) {
                        elm = value;
                        delay = ( key < 10) ? "." + (key) + "s" : "1." + (key) + "s";
                        elm.css('transition-delay', delay);
                        elm.css('opacity','1');
                });



                $("#ribbon-group image").css('opacity','1');
                $("#intro-text").css('opacity','1');


            },1550);

            //ACA



            _this.c.ribbon.add(_this.c.left);
            _this.c.ribbon.add(_this.c.right);
            _this.c.ribbon.add(_this.c.center);
            _this.c.ribbon.add(_this.c.mobile);


            _this.position();


        };


        _this.position = function () {
            //BOX POSITION
            var gbox = _this.c.ribbon.getBBox();
            var box = _this.c.center.getBBox();
            var mbox = _this.c.mobile.getBBox();
            var tr_w = ($(window).width() - box.w + mbox.w) * .5;
            var tr_h = (_this.s.attr().height - box.h) * .4;

            var rt = CSnap.TransformationSet();
            rt.add('translation', CSnap.transforms.translate(tr_w, tr_h));

            _this.c.ribbon.transform(
                    rt.get().snap.toTransformString()
                    );
            //PHONE POSITION
            var tr_y = ($(window).width() > 768) ? box.h / 2 : 0;
            _this.c.mobile.transform(CSnap.transforms.translateY(tr_y).snap.toTransformString());
            //BOTTOMTEXT
            if ($(window).width() > 768) {
                _this.$text.css({
                    position: 'absolute',
                    top: tr_h + box.x + box.h + 15,
                    left: tr_w
                });
                _this.$text.children('p').width(box.w + 60);
            } else {
                _this.$text.css({
                    position: 'relative',
                    top: '-90px',
                    left: 0,
                    marginBottom: '-90px'
                });
                _this.$text.children('p').width('100%');
            }


        };
        _this.gEvents = function () {
            $(window).on('resize', function () {
                _this.position();
            });
        };

        _this.main();


        return _this;
    },
    SkewedSection: function (options) {
        var _this = this;
        _this.defaults = {
            angle: -5
        };
        _this.options = $.extend(_this.defaults, options);

        _this.init = function () {
            _this.styles();
        };

        _this.styles = function () {
            _this.css({
                '-webkit-backface-visibility': 'hidden'
            });
            _this.children('.background').css({
                '-webkit-transform': 'rotate(' + _this.options.angle + 'deg)',
                '-moz-transform': 'rotate(' + _this.options.angle + 'deg)',
                '-o-transform': 'rotate(' + _this.options.angle + 'deg)'
            });
            if (typeof _this.options.background !== 'undefined') {
                _this.children('.background').css('background-color', _this.options.background);
            }
            if (typeof _this.children('.background').data('background-image') !== 'undefined'){
                _this.children('.background').append('<div class="image"></div><div class="overlay"></div>');
                _this.children('.background').children('.image').css({
                    'background-image': 'url(' + _this.children('.background').data('background-image') + ')'
                });
            }
        };
        _this.init();
        return _this;
    },
    CircularIcons: function () {
        var _this = this;

        _this.init = function () {
            _this.find('.icon .text .icon-descr').each(function () {
                var txt = $(this).text();
                $(this).html($.parseHTML(txt.breakAfter(1)));
            });
        };
        _this.init();
        return _this;
    },
    SelectRounded01: function () {
        var _this = this;
        _this.real_select = _this.children('.real_select');
        _this.options = _this.find('.options .option');

        _this.options_container = _this.children('.options');
        _this.options_frame = _this.options_container.children('.options-frame');

        _this.height_closed = 0;
        _this.height_opened = 0;

        _this.init = function () {
            _this.events();
            _this.height_closed = _this.outerHeight();
            _this.height_opened = _this.height_closed;
            _this.options.each(function () {
                _this.height_opened += $(this).outerHeight();
            });
        };
        _this.open = function () {
            _this.options_container.animate({
                height: _this.height_opened
            }, 500);
        };
        _this.close = function () {
            _this.options_container.animate({
                height: _this.height_closed
            }, 500);
        };
        _this.select = function ($option) {

            var $realoption = _this.real_select.find('options[value=' + $option.data('option') + ']');
            _this.real_select.val($realoption.val());


            option_pais = $option.data('option');
            if ( option_pais == 'argentina'){
                $('#tit-pais').html('Argentina');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#foto-pais').css('background-image','url(images/Paises/argentina.jpg)');
                $('#lugar').hide();
                $('#lugar').css('left','50%');

                $('#lugar').css('top','70%');
                setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'chile'){
                $('#tit-pais').html('Chile');
                $('#foto-pais').css('background-image','url(images/Paises/chile.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");

                $('#lugar').hide();
                $('#lugar').css('left','48%');

                $('#lugar').css('top','70%');
                setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'bolivia'){
                $('#tit-pais').html('Bolivia');
                $('#foto-pais').css('background-image','url(images/Paises/bolivia.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#lugar').hide();
                $('#lugar').css('left','48%');

                $('#lugar').css('top','58%');
                setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'colombia'){
                $('#tit-pais').html('Colombia');
                $('#foto-pais').css('background-image','url(images/Paises/colombia.jpg)');
                $('#dir-pais').html("<b>Carrera 12 No.71-33 <br>Bogotá - Colombia</b>");
                $('#lugar').hide();
                $('#lugar').css('left','49%');

                $('#lugar').css('top','33%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'costa_rica'){
                $('#tit-pais').html('Costa Rica');
                $('#foto-pais').css('background-image','url(images/Paises/costa_rica.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#lugar').hide();
                $('#lugar').css('left','46%');

                $('#lugar').css('top','23%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'ecuador'){
                $('#tit-pais').html('Ecuador');
                $('#foto-pais').css('background-image','url(images/Paises/ecuador.jpg)');
                $('#dir-pais').html("<b>Avenida Orellana<br>Edificio World Trade Center<br>Guayaquil - Ecuador</b>");
                $('#lugar').hide();
                $('#lugar').css('left','46%');

                $('#lugar').css('top','39%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'guatemala'){
                $('#tit-pais').html('Guatemala');
                $('#foto-pais').css('background-image','url(images/Paises/guatemala.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#lugar').hide();
                $('#lugar').css('left','41%');

                $('#lugar').css('top','11%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'honduras'){
                $('#tit-pais').html('Honduras');
                $('#foto-pais').css('background-image','url(images/Paises/honduras.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#lugar').hide();
                $('#lugar').css('left','45%');

                $('#lugar').css('top','19%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'mexico'){
                $('#tit-pais').html('Mexico');
                $('#foto-pais').css('background-image','url(images/Paises/mexico.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                 $('#lugar').hide();
                $('#lugar').css('left','41%');

                $('#lugar').css('top','4%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'nicaragua'){
                $('#tit-pais').html('Nicaragua');
                $('#foto-pais').css('background-image','url(images/Paises/nicaragua.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#lugar').hide();
                $('#lugar').css('left','46%');

                $('#lugar').css('top','24%');
                 setTimeout($('#lugar').fadeIn(300),1000);


            }
            else if (option_pais == 'panama'){
                $('#tit-pais').html('Panama');
                $('#foto-pais').css('background-image','url(images/Paises/panama.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#lugar').hide();
                $('#lugar').css('left','49%');

                $('#lugar').css('top','29%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'paraguay'){
                $('#tit-pais').html('Paraguay');
                $('#foto-pais').css('background-image','url(images/Paises/paraguay.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");

                $('#lugar').hide();
                $('#lugar').css('left','51%');

                $('#lugar').css('top','57%');
                 setTimeout($('#lugar').fadeIn(300),1000);
            }
            else if (option_pais == 'peru'){
                $('#tit-pais').html('Peru');
                $('#foto-pais').css('background-image','url(images/Paises/peru.jpg)');
                $('#dir-pais').html("<b>Av. Canaveral y Moreira 522<br>San Isidro - 27<br>Lima - Perú</b>");

                $('#lugar').hide();
                $('#lugar').css('left','46%');

                $('#lugar').css('top','54%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'dominicana'){
                $('#tit-pais').html('Rep. Dominicana');
                $('#foto-pais').css('background-image','url(images/Paises/dominicana.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#lugar').hide();
                $('#lugar').css('left','53%');

                $('#lugar').css('top','16%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'san-salvador'){
                $('#tit-pais').html('San Salvador');
                $('#foto-pais').css('background-image','url(images/Paises/san-salvador.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#lugar').hide();
                $('#lugar').css('left','42%');

                $('#lugar').css('top','18%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
            else if (option_pais == 'uruguay'){
                $('#tit-pais').html('Uruguay');
                $('#foto-pais').css('background-image','url(images/Paises/uruguay.jpg)');
                $('#dir-pais').html("<b>Próximamente</b>");
                $('#lugar').hide();
                $('#lugar').css('left','54%');

                $('#lugar').css('top','60%');
                 setTimeout($('#lugar').fadeIn(300),1000);

            }
        };
        _this.events = function () {
            _this.options_container.hover(function () {
                _this.open();
            }, function () {
                //_this.close();
            });
            _this.options.on('click', function () {
                _this.select($(this));
                _this.close();
            });
        };
        _this.init();
        return _this;
    },
    BigNumber: function () {
        var _this = this;

        _this.title = _this.find('.title h1');
        _this.text = _this.find('.content');

        _this.main = function () {
            _this.title.children('span').addClass('number');
            _this.title.append('<span class="bar"></span>');
            _this.styles();
            _this.events();
        };
        _this.styles = function () {
            _this.title.children('.number').each(function (index) {
                $(this).css({
                    position: 'relative',
                    top: '-' + 50 * (index + 1) + 'px',
                    opacity: 0
                }, 500);
            });
            _this.title.children('.bar').css({
                position: 'relative',
                left: '-70px',
                opacity:0
            });
            _this.text.css({
                position: 'relative',
                left: 50,
                opacity: 0
            });
        };
        _this.events = function () {
            _this.on('scrolled', function () {

                _this.title.children('.number').each(function (index) {
                    $(this).animate({
                        position: 'relative',
                        top: 0,
                        opacity: 1
                    }, 450);
                });
                _this.title.children('.bar').delay(50).animate({
                    left: 0,
                    opacity: 1
                });
                _this.text.delay(50).animate({
                    left: 0,
                    opacity: 1
                }, 450);
            });
        };
        _this.main();
        return _this;
    },
    quienesHablan: function () {
        var _this = this;
        _this.on('scrolled', function () {
            $(".imgQuienesHablan").addClass("animated fadeInRight");
        });
    },

    recursos: function () {
        var _this = this;
        _this.on('scrolled', function () {
            $(".text-recursos").addClass("bordeAmarillo");
        });
    },
    //FUNCTIONS
    getSelector: function () {
        var selector = $(this)
                .parents()
                .map(function () {
                    return this.tagName;
                })
                .get()
                .reverse()
                .concat([this.nodeName])
                .join(">");

        var id = $(this).attr("id");
        if (id) {
            selector += "#" + id;
        }

        var classNames = $(this).attr("class");
        if (classNames) {
            selector += "." + $.trim(classNames).replace(/\s/gi, ".");
        }
        return selector;
    }
});
function StartModules() {
    $('.taxis-a-un-click #introduction').each(function () {
        $(this).TaxisUnClick();
    });
    $('.skewed-section').each(function () {
        $(this).SkewedSection({
            'background': $(this).data('background')
        });
    });
    $('.circular-icons').each(function () {
        $(this).CircularIcons();
    });
    $('.select-rounded-01').each(function () {
        $(this).SelectRounded01();
    });
    $('.big-number-01').each(function () {
        $(this).BigNumber();
    });

    $('.quienesHablan').each(function () {
        $(this).quienesHablan();
    });

    $('.titleSectionRecursos').each(function () {
        $(this).recursos();
    });
}

String.prototype.breakAfter = function (words) {
    var parts = this.split(' ');
    var final_text = '';
    for (var i = 0; i < parts.length; i++) {
        final_text += parts[i];
        if (i === words - 1) {
            final_text += '<br/>';
        } else if (i !== parts.length - 1) {
            final_text += ' ';
        }
    }
    return final_text;
}
function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
            obj.css("-moz-transform") ||
            obj.css("-ms-transform") ||
            obj.css("-o-transform") ||
            obj.css("transform");
    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else {
        var angle = 0;
    }
    return (angle < 0) ? angle + 360 : angle;
}
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function displayAppsBtn(){
    $('#botonera').fadeIn(300);

}

 function scrollFirst() {
    $('html, body').animate( { scrollTop: $('#first').offset().top }, 900 );

}
