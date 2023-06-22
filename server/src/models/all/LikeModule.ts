import { DataTypes } from 'sequelize';
import sequelize from '../../db';

const Like = sequelize.define('like', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export default Like;
