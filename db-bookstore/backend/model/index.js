import { Sequelize } from 'sequelize';
import getUserModel from './User';
import getUserAccountModel from './UserAccount';
import getOrderModel from './Order';
import getBookModel from './Book';
import getOrderDetailModel from './OrderDetail';
import getAuthorModel from './Author';
import getBookAuthorModel from './BookAuthor';
import getGenreModel from './Genre';
import getBookGenreModel from './BookGenre';
import getVendorModel from './Vendor';
import getVendorOrderModel from './VendorOrder';
import getNotificationModel from './Notification';
import getAuditLogModel from './AuditLog';

const sequelize = new Sequelize('Bookstore', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  UserAccount: getUserAccountModel(sequelize, Sequelize),
  Order: getOrderModel(sequelize, Sequelize),
  Book: getBookModel(sequelize, Sequelize),
  OrderDetail: getOrderDetailModel(sequelize, Sequelize),
  Author: getAuthorModel(sequelize, Sequelize),
  BookAuthor: getBookAuthorModel(sequelize, Sequelize),
  Genre: getGenreModel(sequelize, Sequelize),
  BookGenre: getBookGenreModel(sequelize, Sequelize),
  Vendor: getVendorModel(sequelize, Sequelize),
  VendorOrder: getVendorOrderModel(sequelize, Sequelize),
  Notification: getNotificationModel(sequelize, Sequelize),
  AuditLog: getAuditLogModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;