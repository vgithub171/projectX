



let file = {
patch : '@@ -1,51 +1,84 @@\n+\n+turtlemint-ab-service\n turtlemint-agent-pro\n turtlemint-analytics-dashboard\n turtlemint-analytics-dashboard-fe\n turtlemint-api-gateway\n turtlemint-auth-service\n turtlemint-auth-service-v2\n-turtlemint-cms-service\n+turtlemint-claims-backend-motor\n+turtlemint-claims-backend-universal\n+turtlemint-claims-frontend\n turtlemint-cms-service-v2\n turtlemint-common-verticals-service\n+turtlemint-consumer-app-be\n+turtlemint-crm-frontend\n+turtlemint-customer-service\n turtlemint-dpreports\n turtlemint-endorsement\n turtlemint-export-service\n turtlemint-file-service-v2\n turtlemint-form-config\n+turtlemint-form-config-service\n turtlemint-health-service\n turtlemint-help-centre\n turtlemint-help-centre-app\n+turtlemint-integration-platform-be\n+turtlemint-integration-platform-fe\n turtlemint-integrations-framework\n+turtlemint-integrations-framework-motor\n+turtlemint-integrations-framework-v2\n+turtlemint-integrations-framework-v2-platform\n+turtlemint-kyc-service-be\n+turtlemint-kyc-service-fe\n turtlemint-lead-service\n turtlemint-life-service\n turtlemint-master-service\n+turtlemint-master-service-fe\n+turtlemint-master-service-v2\n+turtlemint-minterprise\n turtlemint-mintpro-be\n+turtlemint-mintpro-customer\n turtlemint-mintpro-frontend\n+turtlemint-mintpro-search\n turtlemint-motor-service\n+turtlemint-mutualfund-jobs\n+turtlemint-my-office-service\n turtlemint-ninja-service-backend\n-turtlemint-ninja-frontend\n+turtlemint-notification-rule-engine\n turtlemint-notification-service\n-turtlemint-payment-service\n+turtlemint-payment-service-fe\n turtlemint-payment-service-v2\n+turtlemint-payment-service-v2-ippb\n turtlemint-payout-ledger\n turtlemint-payouts\n turtlemint-payouts-dashboard\n turtlemint-platform-service\n turtlemint-policy-download-service\n turtlemint-premium-calculator\n turtlemint-premium-service\n+turtlemint-premium-service-v2\n turtlemint-prism-service\n+turtlemint-product-catalog\n turtlemint-qis-service\n turtlemint-renewal-frontend\n turtlemint-renewal-service\n+turtlemint-renewal-tm-frontend\n+turtlemint-rpa-service\n turtlemint-rule-engine-service\n turtlemint-status-service\n+turtlemint-telemetry-service\n turtlemint-template-generator\n turtlemint-tm-assistant-be\n turtlemint-tm-assistant-fe\n+turtlemint-tm-fp-back-end\n+turtlemint-tm-fp-front-end\n turtlemint-tmdotcom\n-turtlemint-translation-service\n turtlemint-turtleauth\n+turtlemint-turtledoc-be-service\n+turtlemint-turtledoc-classification\n+turtlemint-turtledoc-fe-service\n+turtlemint-turtledoc-ocr\n+turtlemint-turtledoc-service\n turtlemint-turtlemint-frontend\n-turtlemint-txn-status-check\n-turtlemint-vehicle-details-service\n\\ No newline at end of file\n+turtlemint-vehicle-details-service'
}



console.log(_processFile(file));





function _processFile(file) {
    let _diffContext = [];

    let changeMap = [];
  
    let resultFileMap = {
      newWorkLine: 0,
      reWorkLine: 0,
    };
  
    let patchArr = file.patch?.split("\n");
  
    //const lineAdditionsMap = createMap(patchArr || [] , '+');
    //const lineDeletionMap = createMap(patchArr || [] , '-');

    console.log(patchArr)
  
    for (let line = 0; line < (patchArr || []).length; line++) {
      if (patchArr[line][0] === "-") {
        resultFileMap.reWorkLine = resultFileMap.reWorkLine + 1;
        changeMap.push({line:patchArr[line] , chnageType : 'ReWork'});
      }
  
      if (patchArr[line][0] === "+") {
        let i = line - 1;
        while (i >= 0) {
          if (patchArr[i][0] !== "+" && patchArr[i][0] !== "-") {
            resultFileMap.newWorkLine = resultFileMap.newWorkLine + 1;
            changeMap.push({line:patchArr[line] , chnageType : 'NewWork'});
            break;
          } else {
            if (patchArr[i][0] === "+") {
              i--;
            }
  
            if (patchArr[i][0] === "-") {
              resultFileMap.reWorkLine = resultFileMap.reWorkLine + 1;
              changeMap.push({line:patchArr[line] , chnageType : 'ReWork'});
              break;
            }
          }
        }
      }
    }


    console.log(changeMap);

    console.log(changeMap.length);
  
    return resultFileMap;
  }