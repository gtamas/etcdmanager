import Vue from 'vue';
import Component from 'vue-class-component';
import Mousetrap from 'mousetrap';

@Component({
})
export default class Dialog extends Vue {

    mounted() {
        // @ts-ignore
        const keyboardEvents = new Mousetrap();
        keyboardEvents.stopCallback = () => false;
        keyboardEvents.bind('esc', () => {
            this.cancel();
        });
    }

    confirm() {
        this.$emit('confirm');
    }

    cancel() {
        this.$emit('cancel');
    }
}
