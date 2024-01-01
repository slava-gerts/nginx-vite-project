import toolState from 'store/toolState';
import 'styles/toolbar.scss'

const Settings = () => {
  return (
    <div className='toolbar settings'>
      <section className='toolbar__left'>
        <label>
          Line width{': '}
          <input type="number" defaultValue={1} min={1} max={50} onChange={e => toolState.setLineWidth(Number(e.target.value))} />
        </label>
        <label>
          Border color{': '}
          <input type='color' onChange={e => toolState.setStrokeColor(e.target.value)} />
        </label>
      </section>
    </div>
  );
};

export default Settings;