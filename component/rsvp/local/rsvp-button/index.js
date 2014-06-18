// require installed dependencies.
var request = require('superagent'),
  dom = require('dom');

// require local template.
// component-build(1) converts HTML template to string.
var template = require('./template.html');

/*
  RsvpButton Class
 */
function RsvpButton(options) {
  
  var self = this;
  
  this.options = options = options || {};
  
  this.state = {
    user: false,
    rsvp: false
  };
  
  // Conver the template to DOM elements
  this.el = dom(template);
  
  // Cache elements
  this.els = {
    loading: this.el.find('.RsvpButton-loading')
  };
  this.buttons = {
    all: this.el.find('.RsvpButton-button'),
    register: this.el.find('.RsvpButton-button-register'),
    yesno: this.el.find('.RsvpButton-buttons-yesno'),
    yes: this.el.find('.RsvpButton-button-yes'),
    no: this.el.find('.RsvpButton-button-no')
  };
  
  // users can set a custom class for the buttons
  if (options.buttonClass) {
    this.buttons.all.addClass(options.buttonClass);
  }
  
  // initial UI state
  this.buttons.register.attr('hidden', true);
  this.buttons.yesno.attr('hidden', true);
  
  // bind the events
  this.bindEvents();
  
  // start the state check
  this.checkUser();
  
  // insert the element if a target was provided
  if (options.target) {
    this.appendTo(options.target);
  }
  
}

RsvpButton.prototype.checkUser = function() {
  
  var self = this;
  
  request.get('/api/whoami', function(res) {
    
    self.state.user = res.body.user;
    
    if (!self.state.user) {
      self.updateUI();
    } else {
      self.checkRSVP();
    }
    
  });
  
}

RsvpButton.prototype.checkRSVP = function() {
  
  var self = this;
  
  request.get('/api/rsvp/check', function(res) {
    self.state.rsvp = res.body.rsvp;
    self.updateUI();
  });
  
}

RsvpButton.prototype.bindEvents = function() {
  
  var self = this;
  
  this.buttons.register.on('click', function() {
    
    request.get('/api/signin', function(res) {
      self.state.user = res.body.user;
      self.checkRSVP();
    });
    
  });
  
  this.buttons.yes.on('click', function() {
    
    request.get('/api/rsvp/true', function(res) {
      self.state.rsvp = res.body.rsvp;
      self.updateUI();
    });
    
  });
  
  this.buttons.no.on('click', function() {
    
    request.get('/api/rsvp/false', function(res) {
      self.state.rsvp = res.body.rsvp;
      self.updateUI();
    });
    
  });
  
}

RsvpButton.prototype.updateUI = function() {
  
  // ensure the loading notification is hidden
  this.els.loading.attr('hidden', true);
  
  if (!this.state.user) {
    
    // No user - prompt to register
    this.buttons.yesno.attr('hidden', true);
    this.buttons.register.attr('hidden', undefined);
    
  } else {
    
    // Signed in - show yes / no buttons
    this.buttons.yesno.attr('hidden', undefined);
    this.buttons.register.attr('hidden', true);
    
    // toggle the 'yes' button
    if (this.state.rsvp === true) {
      this.buttons.yes.addClass((this.options.buttonClass || 'Button--is-') + '-active');
    } else {
      this.buttons.yes.removeClass((this.options.buttonClass || 'Button--is-') + '-active');
    }
    
    // toggle the 'no' button
    if (this.state.rsvp === false) {
      this.buttons.no.addClass((this.options.buttonClass || 'Button--is-') + '-active');
    } else {
      this.buttons.no.removeClass((this.options.buttonClass || 'Button--is-') + '-active');
    }
    
  }
}

RsvpButton.prototype.appendTo = function(target) {
  dom(this.el).appendTo(target);
}

// RsvpButton Class will be accessible to others components.
module.exports = RsvpButton;
