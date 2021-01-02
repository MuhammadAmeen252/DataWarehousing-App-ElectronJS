const sql = require("mssql");

const option = localStorage.getItem("item-clicked");
console.log(option);

const dbConfig = {
  server: "localhost\\SQLEXPRESS",
  database: "DWDM",
  user: "sa",
  password: "12345",
};

function getData() {
  var conn = new sql.ConnectionPool(dbConfig);
  if (option == "street address") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, D.street from dbo.SalesFact F, dbo.LocationDimension D where D.location_key = F.location_key group by D.street;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = [];
        let street = [];
        req.query(query).then(function (rec) {
          var html =
            "<h1 class='header'>Total Sales By Street</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Street</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            street.push(rec.recordset[i].street);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].street + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          var ctx = document.getElementById("myChart").getContext("2d");
          var chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: street,
              datasets: [
                {
                  label: "Total Sales By Street",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "year") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, T.year from dbo.TimeDimension T, dbo.SalesFact F where T.time_key = F.time_key group by T.year;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        var years = [];
        var sales = [];
        req.query(query).then(function (rec) {
          console.log(rec.recordset);
          var html =
            "<h1 class='header'>Total Sales By Year</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Year</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            years.push(rec.recordset[i].year);
            sales.push(rec.recordset[i].totalsales);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].year + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: years,
              datasets: [
                {
                  label: "Total Sales By Year",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "quarter") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, T.quarter from dbo.TimeDimension T, dbo.SalesFact F where T.time_key = F.time_key group by T.quarter;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = [],
          quarter = [];
        req.query(query).then(function (rec) {
          var html =
            "<h1 class='header'>Total Sales By Quarter</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Quarter</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            quarter.push(rec.recordset[i].quarter);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].quarter + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: quarter,
              datasets: [
                {
                  label: "Total Sales By Quarter",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "country") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, L.country from dbo.LocationDimension L, dbo.SalesFact F where F.location_key = L.location_key GROUP BY country ;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = [],
          country = [];
        req.query(query).then(function (rec) {
          console.log(rec.recordset);
          var html =
            "<h1 class='header'>Total Sales By Country</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Country</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            country.push(rec.recordset[i].country);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].country + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: country,
              datasets: [
                {
                  label: "Total Sales By Country",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "state") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, L.street from dbo.LocationDimension L, dbo.SalesFact F where F.location_key = L.location_key GROUP BY street ;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = [],
          street = [];
        req.query(query).then(function (rec) {
          console.log(rec.recordset);
          var html =
            "<h1 class='header'>Total Sales By State </h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Street</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            street.push(rec.recordset[i].street);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].street + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: street,
              datasets: [
                {
                  label: "Total Sales By Street",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "city") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, L.city from dbo.LocationDimension L, dbo.SalesFact F where F.location_key = L.location_key GROUP BY city ;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = [],
          city = [];
        req.query(query).then(function (rec) {
          console.log(rec.recordset);
          var html =
            "<h1 class='header'>Total Sales By City</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>City</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            city.push(rec.recordset[i].city);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].city + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: city,
              datasets: [
                {
                  label: "Total Sales By City",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "item brand") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, I.brand from dbo.SalesFact F, dbo.ItemDimension I where F.item_key = I.item_key GROUP BY I.brand ;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = [],
          brand = [];
        req.query(query).then(function (rec) {
          console.log(rec.recordset);
          var html =
            "<h1 class='header'>Total Sales By Brand</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Brand</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            brand.push(rec.recordset[i].brand);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].brand + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: brand,
              datasets: [
                {
                  label: "Total Sales By Brand",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "item type") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, I.type from dbo.SalesFact F, dbo.ItemDimension I where F.item_key = I.item_key GROUP BY I.type ;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = [],
          type = [];
        req.query(query).then(function (rec) {
          console.log(rec.recordset);
          var html =
            "<h1 class='header'>Total Sales By Type</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Type</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            type.push(rec.recordset[i].type);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].type + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: type,
              datasets: [
                {
                  label: "Total Sales By Type",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "month") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, T.month from dbo.TimeDimension T, dbo.SalesFact F where T.time_key = F.time_key group by T.month;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = [],
          month = [];
        req.query(query).then(function (rec) {
          console.log(rec.recordset);
          var html =
            "<h1 class='header'>Total Sales By Month</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Month</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            month.push(rec.recordset[i].month);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].month + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: month,
              datasets: [
                {
                  label: "Total Sales By Month",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "day") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, T.day from dbo.TimeDimension T, dbo.SalesFact F where T.time_key = F.time_key group by T.day;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = [],
          day = [];
        req.query(query).then(function (rec) {
          console.log(rec.recordset);
          var html =
            "<h1 class='header'>Total Sales By Day</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Day</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            day.push(rec.recordset[i].day);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].day + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: day,
              datasets: [
                {
                  label: "Total Sales By Day",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (option == "item name") {
    const query =
      "select SUM(F.dollars_sold) as totalsales, I.item_name from dbo.SalesFact F, dbo.ItemDimension I where F.item_key = I.item_key GROUP BY I.item_name ;";

    conn
      .connect()
      .then(function () {
        var req = new sql.Request(conn);
        let sales = []; let name = [];
        req.query(query).then(function (rec) {
          console.log(rec.recordset);
          var html =
            "<h1 class='header'>Total Sales By Name</h1><br><table class='styled-table' border='1|1'><thead> <tr> <th>Total Sales</th>  <th>Name</th>  </tr> </thead>";
          for (var i = 0; i < rec.recordset.length; i++) {
            sales.push(rec.recordset[i].totalsales);
            name.push(rec.recordset[i].item_name);
            html += "<tbody> <tr>";
            html += "<td>" + rec.recordset[i].totalsales + "</td>";
            html += "<td>" + rec.recordset[i].item_name + "</td>";
            html += "</tr> </tbody>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;

          let ctx = document.getElementById("myChart").getContext("2d");
          let chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: name,
              datasets: [
                {
                  label: "Total Sales By Name",
                  backgroundColor: "#009879",
                  borderColor: "#009879",
                  data: sales,
                },
              ],
            },
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

getData();
