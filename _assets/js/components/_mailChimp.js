// ----------------------------------------------
// Imports
// ----------------------------------------------
import $ from 'jquery';

// ----------------------------------------------
// Mail Chimp
// ----------------------------------------------
const MailChimp = (() => {
  let s;

  return {
    settings() {
      return {
        form: $('#mc-signup'),
        formAction: $('#mc-signup').attr('action'),
        formSubmit: $('#mc-submit'),
        formMessage: $('.subscribe__error'),
        animation: 'fade-in'
      };
    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      s.formSubmit.on('click', e => {
        e.preventDefault();

        $.ajax({
          url: s.formAction,
          type: 'POST',
          data: s.form.serialize(),
          dataType: 'jsonp',
          success: response => {
             window.location = `http://${top.location.host.toString()}/subscribe`;
          }
        });
      });
    }
  };
})();

// ----------------------------------------------
// Exports
// ----------------------------------------------
export default MailChimp;
