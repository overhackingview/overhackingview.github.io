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
            alert(response.result);
            if (response.result === 'error') {
              setTimeout(() => {
                s.formMessage.text(`${response.msg}.`);
                s.formMessage.removeClass('hidden');
                s.formMessage.addClass(s.animation);
              }, 750);
            } else {
              alert(`http://${top.location.host.toString()}/subscribe`);
              window.location = `http://${top.location.host.toString()}/subscribe`;
            }
          },
          error: () => {
            setTimeout(() => {
              alert('erro final');
              s.formMessage.text('There was an error.');
              s.formMessage.removeClass('hidden');
              s.formMessage.addClass(s.animation);
            }, 750);
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
