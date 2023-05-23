{
    class App {
        constructor() {
            this.cable = ActionCable.createConsumer(consumerUrl);
            console.log(this.cable);

            this.cookie = new Cookies();
            this.requester = new Requester();
            this.analyzer = new Analyzer();
            this.form = new Form();

            this.loadPartials();
        }

        async loadPartials() {
            const result = await this.form.loadPartials();
            this.getNickname();
        }

        async getNickname() {
            const result = await this.cookie.get('nickname');
            if (result !== '') {
                document.getElementById('message').setAttribute('placeholder', 'Please be nice, ' + result);
                document.getElementById('message-form').style.display = 'block';
            } else {
                document.getElementById('nickname-form').style.display = 'block';
            }
        }

        async setNickname(value) {
            const result = await this.analyzer.analyze(value);
            const messageData = JSON.parse(result.responseText);
            if (messageData.results.value !== 'Adult') {
                this.cookie.set('nickname', value);
                document.getElementById('message').setAttribute('placeholder', 'Please be nice, ' + value);
                document.getElementById('message-form').style.display = 'block';
                document.getElementById('nickname-form').style.display = 'none';
            }
        }
    }

    // Create an instance of App
    const app = new App();
}
