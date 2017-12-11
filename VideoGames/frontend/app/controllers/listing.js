import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        search() {
            this.set('model', this.get('store').query('game', { search: this.get('searchbox') }));
        }
    }
});
