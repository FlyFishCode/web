import mitt from 'mitt';

interface BusDataProp {
	on?: any;
	off?: any;
	emit?: any;
}

const bus: BusDataProp = {
	on: '',
	off: '',
	emit: ''
};
const emitter = mitt();
bus.on = emitter.on;
bus.off = emitter.off;
bus.emit = emitter.emit;

export default bus;
