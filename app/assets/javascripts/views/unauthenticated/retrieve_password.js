BD.Views.Unauthenticated = BD.Views.Unauthenticated || {};

BD.Views.Unauthenticated.RetrievePassword = Backbone.Marionette.ItemView.extend({
  template: 'unauthenticated/retrieve_password',

  events: {
    'submit form': 'retrievePassword'
  },

  onRender: function() {
    this.model = new BD.Models.UserPasswordRecovery();
    Backbone.ModelBinding.bind(this);
  },

  retrievePassword: function(e) {
    var self = this,
        el = $(this.el);

    e.preventDefault();

    el.find('input.btn-primary').button('loading');
    el.find('.alert-error').remove();

    this.model.save(this.model.attributes, {
      success: function(userSession, response) {
        el.find('form').prepend(BD.Helpers.Notifications.success("Instructions for resetting your password have been sent. Please check your email for further instructions."));
        el.find('input.btn-primary').button('reset');
      },
      error: function(userSession, response) {
        el.find('form').prepend(BD.Helpers.Notifications.error("The email you entered did not match an email in our database."));
        el.find('input.btn-primary').button('reset');
      }
    });
  }
});
