Polymer('rsvp-button', {
  
  user: undefined,
  rsvp: undefined,
  
  rsvp_no_class: '',
  rsvp_yes_class: '',
  
  signin: function() {
    this.$.ajax_signin.go();
  },
  
  rsvpYes: function() {
    this.$.ajax_rsvp_yes.go();
  },
  
  rsvpNo: function() {
    this.$.ajax_rsvp_no.go();
  },
  
  updateUI: function() {
    
    this.$.loading.style.display = 'none';
    
    if (!this.user) {
      
      // No user; show the register button
      // and hide the yes/no buttons
      this.$.btn_register.style.display = '';
      this.$.btns_yesno.style.display = 'none';
      
    } else {
      
      // Signed in; hide the register button,
      // and show the yes/no buttons
      this.$.btn_register.style.display = 'none';
      this.$.btns_yesno.style.display = '';
      
      console.log(this.rsvp);
      
      this.rsvp_no_class = (this.rsvp === false) ? 'pure-button-active' : '';
      this.rsvp_yes_class = (this.rsvp === true) ? 'pure-button-active' : '';
      
    }
    
  },
  
  ready: function() {
    
    var self = this;
    
    this.$.btn_register.style.display = 'none';
    this.$.btns_yesno.style.display = 'none';
    
    var handleUserResponse = function() {
      self.user = this.response.user;
      if (self.user) {
        self.$.ajax_rsvp_check.go();
      } else {
        self.updateUI();
      }
    }
    
    this.$.ajax_whoami.addEventListener('core-response', handleUserResponse);
    this.$.ajax_signin.addEventListener('core-response', handleUserResponse);
    
    var handleRsvpResponse = function() {
      self.rsvp = this.response.rsvp;
      console.log(this.response);
      self.updateUI();
    }
    
    this.$.ajax_rsvp_check.addEventListener('core-response', handleRsvpResponse);
    this.$.ajax_rsvp_yes.addEventListener('core-response', handleRsvpResponse);
    this.$.ajax_rsvp_no.addEventListener('core-response', handleRsvpResponse);
    
    this.$.ajax_whoami.go();
    
  }
});
