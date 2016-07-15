"use strict";
( function(){

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
    
    $.each( $( '.filter' ), function(){
        new Filter ( $( this ) )
    } );

    $.each( $( '.my-icons' ), function(){
        new MyIcons ( $( this ) )
    } );

} )();