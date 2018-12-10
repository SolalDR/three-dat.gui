/**
 * @class An abstract class to implement event system https://gist.github.com/SolalDR/3d41b385ab863e996bfaf5344a09eea5
 * @abstract
 * @author SolalDR - solal.dussout-revel@hotmail.fr
 */
class Event {

  constructor() {
    this.events = {};
  }
    
  /**
   * Test if a function is registered in the event stack
   * @param {string} event 
   * @param {function} callback 
   * @return boolean
   */
   eventExist( event, callback ){
    var exist = false;
    if( this.events[ event ] ) {
      for( var i=0; i < this.events[ event ].length; i++ ){
        if( this.events[ event ] === callback ){
          exist = true;
        }
      }
    }
    return exist;
  }
    
  /**
   * Trigger all the callbacks registered in an event
   * @param {string} e The event name 
   * @param {Object} args An object with params passed in argument of the callback
   */
   dispatch( event, args = {} ){
    var list = event instanceof Array ? event : [ event ];
    
    for( var j=0; j<list.length; j++ ){
      if( this.events[ list[ j ] ] && this.events[ list[ j ] ].length ){
        for( var i=0; i<this.events[ list[ j ] ].length; i++ ){
          var callback = this.events[ list[ j ] ][ i ];
          callback.call( this, args );
        }
      }
    }
  }

  /**
   * 
   * @param {*} event 
   * @param {*} callback 
   */
  once( event, callback ){
    var onceCallback = (e)=>{
      callback.call(this, e);
      this.off(event, onceCallback);
    }
    this.on(event, onceCallback);

    return this;
  }
    
  /**
   * Register a new callback for an event
   * @param {string} event 
   * @param {function} callback 
   */
   on( event, callback ){
    if( typeof this.events[ event ] === "undefined" ){
      this.events[ event ] = [];
    }
      
    if( this.events[ event ] && !this.eventExist( event, callback ) ) {
      this.events[ event ].push( callback );
    }
    
    return this;
  }
      
  /**
   * Unregister a callback from an event
   * @param {*} event 
   * @param {*} callback 
   */
   off( event, callback ){
    if( this.events[ event ] ){
      var i = this.events[ event ].indexOf( callback );
      if( i >= 0){
        this.events[ event ].splice( i, 1 );
      }
    }

    return this;
  }
}

export default Event;
