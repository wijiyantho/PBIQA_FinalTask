import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  vus: 5,
  duration: '3m',
  // iterations: 2,
};

export default function() {
  // group('Get Status', function(){
  //   let res = http.get('https://dummy.restapiexample.com/api/v1/employees');
  //   check(res, {'status was 200': (r) => r.status == 200});
  //   sleep(1);
  // });

  let formData = {name: 'Winona Ryder', salary: 100350, age: 53};
  let formDta = {name: 'Reza Rahadian'};

  group('Create Item', function(){
    let url = 'https://dummy.restapiexample.com/api/v1/create';
    let header = {'Content-Type':'application/json'};
    let res = http.post(url, JSON.stringify(formData), {headers: header}, );
    check(res, {'Item Created': (r) => r.status == 200});
    sleep(1);
  });

  group('Edit Item', function(){
    let url = 'https://dummy.restapiexample.com/api/v1/update/19';
    let head = {'Content-Type':'application/json'};
    let resp = http.put(url, JSON.stringify(formDta), {headers: head}, );
    check(resp, {'Item Edited': (r) => r.status == 200});
    sleep(1);
  });
};

export function handleSummary(data) {
  return {
    "resultlow.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

