const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'journeytothewest'
});

client.connect()
  .catch((error) => console.log(error));

module.exports = client;
