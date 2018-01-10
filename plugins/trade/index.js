import PluginStore from 'trader/pluginStore';
import Trade from './main';

import './style.css';

PluginStore.register('trade', 'main', Trade);
