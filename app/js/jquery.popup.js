var popup;
( function(){

    $( function(){

        $( '.popup' ).each(function(){

            popup = new Popup($(this));

        });

    });

    var Popup = function( obj ){

        //private properties
        var _self = this,
            _popupPadding = 40,
            _btnShow =  $( '.popup__open' ),
            _obj = obj,
            _btnClose = _obj.find( '.popup__close, .popup__cancel, .close' ),
            _wrap = _obj.find( '.popup__wrap' ),
            _contents = _obj.find( '.popup__content' ),
            _scrollConteiner = $( 'html' ),
            _window = $( window ),
            _timer = setTimeout( function(){}, 1 );

        //private methods
        var _centerWrap = function(){
                if ( _window.height() - ( _popupPadding * 2 ) - _wrap.height() > 0 ) {
                    _wrap.css( { top: ( ( _window.height() - ( _popupPadding * 2 ) ) - _wrap.height() ) / 2 } );
                } else {
                    _wrap.css( { top: 0 } );
                }
            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'popup__scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _hide = function(){

                var popupContent = _obj.find( '.popup__content' );

                $.each( popupContent, function() {

                    var curContent = $( this );

                    if ( curContent.attr( 'data-icon' ) ){

                        curContent.removeAttr( 'data-icon' );

                    }

                } );

                _obj.css( {
                    overflowY: 'hidden'
                } );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );

                _obj.removeClass( 'popup_opened' );
                _obj.addClass( 'popup_hide' );

                _timer = setTimeout( function(){

                    _obj.css ({
                        overflowY: 'auto'
                    });

                    _obj.removeClass( 'popup_hide' );
                }, 300 );

            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _onEvents();
            },
            _onEvents = function(){
                _window.on( {
                    resize: function(){
                        _centerWrap();
                    }
                } );

                $( 'body' ).on( 'click', '.popup__open', function() {

                    var curLink = $( this );

                    _show( curLink.attr( 'data-popup' ), curLink );

                    return false;

                } );

                _wrap.on( {
                    click: function( e ){
                        e.stopPropagation();
                    }
                } );
                _obj.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
                _btnClose.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
            },
            _addDataIcon = function( data, curContent ) {

                curContent.attr( 'data-icon', data );

            },
            _show = function( className, curLink ){
                _setPopupContent( className, curLink );

                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
                _obj.addClass( 'popup_opened' );
                _centerWrap();

            },
            _setPopupContent = function( className, curLink ){

                var curContent = _contents.filter( '.popup__' + className );

                _contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );

                if ( curLink.attr( 'data-icon' ) ){
                    _addDataIcon( curLink.data( 'icon' ), curContent );
                }

            };

        //public properties

        //public methods


        _init();
    };
} )();

