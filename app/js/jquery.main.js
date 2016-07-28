"use strict";
( function(){

    $( function() {

        $.each( $( '.dashboard' ), function() {
            new DashboardMenu( $( this ) );
        } );

        $.each( $( '.filter' ), function(){
            new Filter ( $( this ) )
        } );

        $.each( $( '.perfect-scroll' ), function(){

            $( this ).perfectScrollbar();

        } );

    } );

    var DashboardMenu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window),
            _menuBtn = _obj.find('.dashboard__menu-btn'),
            _menuBtnClose = _obj.find('.dashboard__header-close'),
            _menuItems = _obj.find('.dashboard__header'),
            _html = $('html'),
            _body = $('body');

        //private methods
        var  _closeMenu = function() {

                _obj.removeClass( 'opened' );
                _html.css( {
                    'overflow-y': 'auto'
                } );
                _body.css( {
                    'overflow-y': 'auto'
                } );
                _menuItems.attr( 'style', '' );

            },
            _onEvents = function () {

                _window.on( {

                    resize: function () {

                        if( _window.width() >= 992 ) {

                            if( _obj.hasClass( 'opened' ) ) {

                                _closeMenu();

                            }

                        }

                    }

                } );

                _menuBtn.on( {

                    click: function () {

                        _openMenu();

                        return false;

                    }

                } );

                _menuBtnClose.on( {

                    click: function () {

                        _closeMenu();

                        return false;

                    }

                } );

            },
            _openMenu = function() {

                _obj.addClass( 'opened' );
                _html.css( {
                    'overflow-y': 'hidden'
                } );
                _body.css( {
                    'overflow-y': 'hidden'
                } );

                _setHeight();

            },
            _init = function () {

                _onEvents();
                _obj[0].obj = _self;

            },
            _setHeight = function() {
                _menuItems.height( _window.height() - _menuItems.offset().top );
            };


        _init();
    };

    var Filter = function ( obj ) {

        var _self = this,
            _obj = obj,
            _inner = _obj.find( '.filter__inner' ),
            _content = $( '.filter__content' ),
            _btn = _obj.find( '.filter__title-inner' ),
            _closeBtn = _obj.find( '.close' ),
            _filterSort = _obj.find( '.filter__sort' ),
            _inputs = _obj.find( '.filter__hidden' ),
            _html = $( 'html' ),
            _wrap = _obj.find( '.filter__wrap' ),
            _path = _obj.attr( 'action' ),
            _checkbox = _obj.find( 'input[type="checkbox"]' ),
            _window = $( window ),
            _canAddProjects = true,
            _loader = _content.find( '.preloader' ),
            _request = new XMLHttpRequest(),
            currentPage = 1;

        var _addEvents = function () {

                _obj.on( {

                    click: function() {

                        _hideWrap();

                    }

                } );

                _inner.on( {

                    click: function( event ) {

                        event.stopPropagation();

                    }

                } );

                _btn.on( {

                    click: function( event ) {

                        _html.css( {
                            'overflow-y': 'hidden'
                        } );

                        _wrap.css( {
                            display: 'block'
                        } );

                        setTimeout( function() {
                            _wrap.addClass( 'active' );
                        },1 );

                        event.stopPropagation();

                    }

                } );

                _closeBtn.on( {

                    click: function() {

                        _hideWrap();

                    }

                } );

                _filterSort.on( {

                    click: function() {

                        var curLabel = $( this ),
                            curInput = curLabel.closest( '.filter__row' ).find( '.filter__hidden' );

                        if ( curInput.val() == 'toTop' ){

                            _inputs.val( '' );
                            curInput.val( 'toBottom' );

                            _changeContent();

                        } else {

                            _inputs.val( '' );
                            curInput.val( 'toTop' );
                            _changeContent();

                        }

                    }

                } );

                _checkbox.on( {

                    change: function() {
                        _changeContent();
                    }

                } );

                _window.on({

                    'scroll': function(){

                        var scrollTop = _window.scrollTop();

                        if ( (scrollTop + _window.height() ) > (_content.offset().top + _content.height()) ) {

                            if ( _canAddProjects ) {
                                _canAddProjects = false;
                                _loader.addClass( 'active' );
                                _ajaxRequest();
                            }
                        }
                    }

                });

            },
            _changeContent = function() {

                var item = _content.find( '.my-icons__item' );
                item.addClass( 'my-icons__item_close' );
                currentPage = 0;
                setTimeout( function() {

                    item.remove();
                    _ajaxRequest();

                },399 ) ;

            },
            _addFilterContent = function( msg ) {

                $.each( msg.items, function() {

                    var timeHTML = this.datetime.split( '-'),
                        newTimeHTML = [];

                    timeHTML[0] = timeHTML[0].split('');
                    timeHTML[0].splice(0,2);
                    timeHTML[0] = timeHTML[0].join('');
                    newTimeHTML[0] = timeHTML[2];
                    newTimeHTML[1] = timeHTML[1];
                    newTimeHTML[2] = timeHTML[0];
                    newTimeHTML = newTimeHTML.join('.');

                    var newBlock = $( '<div class="my-icons__item hidden">'+
                                            '<div class="my-icons__name">'+ this.name +'</div>'+
                                            '<span class="my-icons__pic" style="background-image: url('+ this.url + ')"></span>'+
                                            '<div class="my-icons__footer">' +
                                                '<time class="my-icons__date" datetime="'+ this.datetime +'">'+ newTimeHTML +'</time>'+
                                                '<a href="#" class="my-icons__upload popup__open" data-popup="upload" data-icon="'+ this.dataIcon +'"></a>'+
                                            '</div>'+
                                    '</div>' );

                    _content.append( newBlock );

                } );

                var newItems = _content.find( '.hidden' );

                setTimeout( function() {

                    newItems.each( function( i ) {
                        _showNewItems( $( this ), i );
                    } );

                }, 50 );

            },
            _showNewItems = function( item, index ){

                setTimeout( function() {
                    item.removeClass( 'hidden' );
                }, index * 50 );

            },
            _ajaxRequest = function(){

                _request.abort();
                _request = $.ajax( {
                    url: _path,
                    data: {
                        action : "get_posts",
                        filterData: $( '.filter' ).serialize(),
                        currentPage: currentPage
                    },
                    dataType: 'json',
                    timeout: 20000,
                    type: 'GET',
                    success: function ( msg ) {

                        _addFilterContent( msg );
                        _loader.removeClass('active');

                        if ( msg.col > 0 ) {
                            currentPage++;
                            _canAddProjects = true;
                        } else {
                            _canAddProjects = false;
                        }

                    },
                    error: function ( XMLHttpRequest ) {
                        if( XMLHttpRequest.statusText != 'abort' ) {
                            console.error( 'Error!' );
                        }
                    }
                });

            },
            _hideWrap = function() {

                _wrap.removeClass( 'active' );

                setTimeout( function() {

                    _wrap.attr( 'style', '' );

                },300 );

                _html.css( {
                    'overflow-y': 'auto'
                } );

            },
            _init = function () {
                _ajaxRequest();
                _addEvents();
                _obj[0].obj = _self;
            };

        _init();

    };

} )();