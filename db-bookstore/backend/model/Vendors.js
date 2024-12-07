const getVendorModel = (sequelize, { DataTypes }) => {
  const Vendor = sequelize.define('Vendor', {
    VendorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CompanyName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ContactName: {
      type: DataTypes.STRING(100),
    },
    ContactEmail: {
      type: DataTypes.STRING(255),
    },
    ContactPhone: {
      type: DataTypes.STRING(15),
    },
    Address: {
      type: DataTypes.TEXT,
    },
    SupplyType: {
      type: DataTypes.ENUM('Books', 'E-Books', 'Logistics'),
      allowNull: false,
    },
  });

  return Vendor;
};

export default getVendorModel;