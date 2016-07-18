"use strict";
( function(){

    $( function() {

        $.each( $( '.dashboard' ), function() {
            new DashboardMenu( $( this ) );
        } );

        $.each( $( '.filter' ), function(){
            new Filter ( $( this ) )
        } );

        $.each( $( '.my-icons' ), function(){
            new MyIcons ( $( this ) )
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
            _btn = _obj.find( '.filter__title-inner'),
            _closeBtn = _obj.find( '.close'),
            _html = $( 'html' ),
            _wrap = _obj.find( '.filter__wrap' );

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

    var MyIcons = function ( obj ) {

        var _self = this,
            _obj = obj,
            _btnUpload = _obj.find( '.my-icons__upload' );

        var _addEvents = function () {

                _btnUpload.on( {

                    click: function() {

                        var dataIcon = $( this ).parents( '.my-icons__item' ).data( 'icon' );

                        return false;
                    }

                } );

            },
            _createPopup = function() {



            },
            _init = function () {
                _addEvents();
                _obj[0].obj = _self;
            };

        _init();

    };

} )();