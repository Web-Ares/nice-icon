"use strict";
( function(){

    $( function() {

        $.each( $( '.dashboard' ), function() {
            new DashboardMenu( $( this ) );
        } );

        $.each( $( '.filter' ), function(){
            new Filter ( $( this ) )
        } );

    } );

    var DashboardMenu = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window),
            _menuBtn = _obj.find('.dashboard__menu-btn'),
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

                        if( _obj.hasClass( 'opened' ) ) {

                            _closeMenu();

                        }

                    }

                } );

                _menuBtn.on( {

                    click: function () {

                        if( _obj.hasClass( 'opened' ) ) {

                            _closeMenu();


                        } else {

                            _openMenu();

                        }

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
            _inner = _obj.find( '.filter__inner'),
            _content = $( '.filter__content'),
            _btn = _obj.find( '.filter__title-inner'),
            _closeBtn = _obj.find( '.close'),
            _filterSort = _obj.find( '.filter__sort'),
            _inputs = _obj.find( '.filter__hidden'),
            _html = $( 'html' ),
            _wrap = _obj.find( '.filter__wrap'),
            _path = _obj.attr( 'action' ),
            _request = new XMLHttpRequest();

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

                            _ajaxRequest();

                        } else {

                            _inputs.val( '' );
                            curInput.val( 'toTop' );

                            _ajaxRequest();

                        }

                    }

                } );

            },
            _addFilterContent = function( msg ) {

                var hasItems = msg.has_items;

                $.each( msg.items, function() {

                    var newBlock = $( '<div class="my-icons__item hidden">'+
                                            '<div class="my-icons__name">+ this.name +</div>'+
                                            '<span class="my-icons__pic" style="background-image: url('+ this.url + ')"></span>'+
                                            '<div class="my-icons__footer">' +
                                                '<time class="my-icons__date" datetime="'+ this.datetime +'">+ this.timeHTML +</time>'+
                                                '<a href="#" class="my-icons__upload popup__open" data-popup="upload" data-icon="'+ this.dataIcon +'"></a>'+
                                            '</div>'+
                                    '</div>' );

                    _content.append( newBlock );

                } );

                var newItems = _content.find( '.hidden' );

                setTimeout( function() {
                    _heightAnimation( hasItems, newItems );
                }, 50 );

            },
            _heightAnimation = function( hasItems, newItems ) {

                newItems.each( function( i ) {
                    _showNewItems( $( this ), i );
                } );

            },
            _showNewItems = function( item, index ){

                setTimeout( function() {
                    item.removeClass( 'hidden' );
                }, index * 100 );

            },
            _ajaxRequest = function(){

                var newsItem = _content.find( '.my-icons__item' );

                console.log(newsItem.length);
                _request.abort();
                _request = $.ajax( {
                    url: _path,
                    data: _obj.serialize(),
                    //data: {
                    //    loadedCount: newsItem.length
                    //},
                    dataType: 'html',
                    timeout: 20000,
                    type: 'GET',
                    success: function ( msg ) {

                        console.log('success');

                        //_addFilterContent( msg );

                    },
                    error: function ( XMLHttpRequest ) {
                        if( XMLHttpRequest.statusText != 'abort' ) {
                            alert( 'Error!' );
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
                _addEvents();
                _obj[0].obj = _self;
            };

        _init();

    };

} )();