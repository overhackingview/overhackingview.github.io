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
        var hasError = false;
		
        $.ajax({
          url: s.formAction,
          type: 'POST',
          data: s.form.serialize(),
          dataType: 'jsonp',
          success: response => {
            if (response.result === 'error') {
              hasError = true;
              setTimeout(() => {
                s.formMessage.text(`${response.msg}.`);
                s.formMessage.removeClass('hidden');
                s.formMessage.addClass(s.animation);
              }, 750);
            } else {
	      console.log('será redirecionado para: ' + `http://${top.location.host.toString()}/subscribe`)
	      window.location = `http://${top.location.host.toString()}/subscribe`;
            }
          },
          error: () => {
            hasError=true;
            setTimeout(() => {
              console.log('erro final - ' + ' form.serialize: ' + s.form.serialize() + ' apenas form: ' + s.form);
              s.formMessage.text('There was an error.');
              s.formMessage.removeClass('hidden');
              s.formMessage.addClass(s.animation);
            }, 750);
          }
        });
	if(!hasError) {
	   s.formMessage.text('Email subscribed ');
        }
	
      });
    }
  };
})();

// ----------------------------------------------
// Exports
// ----------------------------------------------
export default MailChimp;
