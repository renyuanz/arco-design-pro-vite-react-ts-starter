import { combineReducers } from 'redux';
import global from './global';
import searchTable from '../pages/search-table/redux/reducer';
export default combineReducers({
    global: global,
    searchTable: searchTable,
});
