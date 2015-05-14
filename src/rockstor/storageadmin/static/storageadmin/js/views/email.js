/*
 *
 * @licstart  The following is the entire license notice for the 
 * JavaScript code in this page.
 * 
 * Copyright (c) 2012-2013 RockStor, Inc. <http://rockstor.com>
 * This file is part of RockStor.
 * 
 * RockStor is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published
 * by the Free Software Foundation; either version 2 of the License,
 * or (at your option) any later version.
 * 
 * RockStor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 * 
 */

EmailView = RockstorLayoutView.extend({
	events: {
	"click #Add-email-address" : "renderEmailForm",
	 "click #cancel": "cancel",
	
},
initialize: function() {
	this.template = window.JST.email_email_setup;
	 this.updatetemplate = window.JST.email_email;
},

render: function() {
    this.fetch(this.renderEmail, this);
    return this;
  },
  
  renderEmail: function() {
	 $(this.el).html(this.template());
  },
  
renderEmailForm: function() {
	var _this = this;
	 $(this.el).html(this.updatetemplate());
	 
    this.$('#port').change(function(){
    	if(this.value == 465){
    		$('input:radio[name=secured_connection]')[0].checked = true;
    		
    	}else if(this.value == 587){
    		$('input:radio[name=secured_connection]')[1].checked = true;
    	}
     }); 
	
    this.$('#email-form input').tooltip({placement: 'right'});

    this.validator = this.$('#email-form').validate({
    	 onfocusout: false,
         onkeyup: false,
         rules: {
           name: 'required',
           email_id: 'required',
           smtpName: 'required',
           username: 'required',
         },

         submitHandler: function() {
           console.log('inside submit handler');
           var button = $('#add-email');
           disableButton(button);
           var submitmethod = 'POST';
           var posturl = '/api/email';
           var data = _this.$('#email-form').getJSON();
           $.ajax({
             url: posturl,
             type: submitmethod,
             dataType: 'json',
             contentType: 'application/json',
             data: JSON.stringify(data),
             success: function() {
               enableButton(button);
               _this.$('#email-form :input').tooltip('hide');
               app_router.navigate('email', {trigger: true});
             },
             error: function(xhr, status, error) {
               enableButton(button);
             }
           });
    	
        return false;
      }	
    });    
},

cancel: function(event) {
    event.preventDefault();
  
  },
  

});
