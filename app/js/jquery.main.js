"use strict";
( function(){

    var Filter = function ( obj ) {

        var _self = this,
            _obj = obj,
            _btn = _obj.find( '.filter__title-inner'),
            _wrap = _obj.find( '.filter__wrap' );

        var _addEvents = function () {

                _btn.on( {

                    click: function() {

                        _wrap.css( {
                            display: 'block'
                        } );

                        _wrap.addClass( 'active' );

                    }

                } );

            },
            _hideWrap = function() {

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

} )();