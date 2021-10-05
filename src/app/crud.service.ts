import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})

export class CrudService {
  
  private dbInstance: SQLiteObject;
  readonly db_name: string = "vessel.db";
  readonly db_table: string = "vessels";
  VESSELS: Array <any> ;

  constructor(
    private platform: Platform,
    private sqlite: SQLite    
  ) { 
    this.databaseConn();
  }

    // Create SQLite database 
     // sqLite.executeSql('DROP TABLE IF EXISTS vessels');
    databaseConn() {
        this.platform.ready().then(() => {
          this.sqlite.create({
              name: this.db_name,
              location: 'default'
            }).then((sqLite: SQLiteObject) => {
              this.dbInstance = sqLite;
              // sqLite.executeSql('DROP TABLE IF EXISTS vessels');
                sqLite.executeSql(`
                  CREATE TABLE IF NOT EXISTS ${this.db_table} (
                    vessel_id INTEGER PRIMARY KEY, 
                    startDate varchar(255),
                    startTime varchar(255),
                    endTime varchar(255),
                    departurePoint varchar(255),
                    arrivalPoint varchar(255),
                    avespeed varchar(255),
                    fuel varchar(255),
                    weather varchar(255),  
                    wind varchar(255), 
                    comment varchar(255), 
                    crewnumber varchar(255),
                    loggedby varchar(255)              
                  )`, [])
                .then((res) => {
                  // alert(JSON.stringify(res));
                })
                .catch((error) => alert(JSON.stringify(error)));
            })
            .catch((error) => alert(JSON.stringify(error)));
        });   
    }

    // Crud
    public addItem(a, b, c, d, e, f, g, h, i, j, k, l) {
      // validation
      if (!a.length || !b.length || !c.length || !d.length || !e.length || !f.length || !g.length || !h.length || !i.length || !j.length || !k.length || !l.length) { 
        alert('Provide both startTime & startDate');
        return;
      }
      this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (startDate, startTime, endTime, departurePoint, arrivalPoint, avespeed, fuel, weather, wind, comment, crewnumber, loggedby) VALUES ('${a}', '${b}', '${c}', '${d}', '${e}', '${f}', '${g}', '${h}', '${i}',  '${j}', '${k}', '${l}')`, [])
        .then(() => {
          alert("Success");
          this.getAllVessels();
        }, (e) => {
          alert(JSON.stringify(e));
        });
    }


    getAllVessels() {
      return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
        this.VESSELS = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.VESSELS.push(res.rows.item(i));
          }
          return this.VESSELS;
        }
      },(e) => {
        alert(JSON.stringify(e));
      });
    }

    // Get Vessel
    getVessel(id): Promise<any> {
      return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE vessel_id = ?`, [id])
      .then((res) => { 
        return {
          vessel_id: res.rows.item(0).vessel_id,
          startDate: res.rows.item(0).startDate,  
          startTime: res.rows.item(0).startTime,
          endTime: res.rows.item(0).endTime,
          departurePoint: res.rows.item(0).departurePoint,
          arrivalPoint: res.rows.item(0).arrivalPoint,
          avespeed: res.rows.item(0).avespeed,
          fuel: res.rows.item(0).fuel,
          weather: res.rows.item(0).weather,
          wind: res.rows.item(0).wind,
          comment: res.rows.item(0).comment,
          crewnumber: res.rows.item(0).crewnumber,
          loggedby: res.rows.item(0).loggedby
        }
      });
    }

    // Update
    updateVessel(id, startDate, startTime, endTime, departurePoint, arrivalPoint, avespeed, fuel, weather, wind, comment, crewnumber, loggedby) {
      let data = [startDate, startTime, endTime,departurePoint, arrivalPoint, avespeed, fuel, weather, wind, comment, crewnumber, loggedby];
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET startDate = ?, startTime = ?, endTime = ?, departurePoint = ?, arrivalPoint = ?, avespeed = ?, fuel = ?, weather = ?,  wind = ? ,  comment = ?, crewnumber = ?, loggedby = ? WHERE vessel_id = ${id}`, data)
    }  

    // Delete
    deleteVessel(vessel) {
      this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE vessel_id = ${vessel}`, [])
        .then(() => {
          alert("Vessel deleted!");
          this.getAllVessels();
        })
        .catch(e => {
          alert(JSON.stringify(e))
        });
    }

}