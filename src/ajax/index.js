import axios from 'axios'
class Ajax {
	constructor () {
		this.url = 'http://localhost:4500'
	}
	'get' (addr) {
		const url = this.url + addr
		return new Promise((resolve, reject) => {
			axios.get(url).then(d => {
				resolve(d)
			}).catch(err => {
				reject(err)
			})
		})
	}
	'post' (addr, data) {
		const url = this.url + addr
		return new Promise((resolve, reject) => {
			axios.post(url, data).then(d => {
				resolve(d)
			}).catch(err => {
				reject(err)
			})
		})
	}
}
export default Ajax
