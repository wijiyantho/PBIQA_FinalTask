import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  vus: 1000,
  // duration: '3m',
  iterations: 3500,
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<=2000'],
  },
};

export default function() {
  // group('Get Single Status', function(){
  //   let res = http.get('https://reqres.in/api/users/2');
  //   check(res, {'status was 200': (r) => r.status == 200});
  //   sleep(1);
  // });

  let formData = {name: 'neotheone', job: 'creator'};
  let formDta = {name: 'neotheone', job: 'follower'};

  group('Create Item', function(){
    let url = 'https://reqres.in/api/users';
    let header = {'Content-Type':'application/json; charset=utf-8'};
    let res = http.post(url, JSON.stringify(formData), {headers: header}, );
    check(res, {'Item Created (Status 201)': (r) => r.status == 201});
    sleep(1);
  });

  group('Edit Item', function(){
    let url = 'https://reqres.in/api/users/';
    let head = {'Content-Type':'application/json; charset=utf-8'};
    let resp = http.put(url, JSON.stringify(formDta), {headers: head}, );
    check(resp, {'Item Edited (Status 200)': (r) => r.status == 200});
    sleep(1);
  });
};

export function handleSummary(data) {
  return {
    "resultperf_reqres.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
