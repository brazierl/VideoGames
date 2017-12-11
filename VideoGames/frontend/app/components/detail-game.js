import Component from '@ember/component';

export default Component.extend({
    id: Ember.computed('id', function () {
        return this.get('model.id');
    }),

    actions: {
        openModal: function (idGame) {
            Ember.$('.ui.detailGame' + idGame + '.modal').modal({
                closable: true,
                detachable: false,

                onApprove: () => {
                    return true;
                }
            })
                .modal('show');

            // Adjust textarea row number
            Ember.$('textarea').each(function () {
                Ember.$(this).height(Ember.$(this).prop('scrollHeight'));
            });
        },
    }
});
