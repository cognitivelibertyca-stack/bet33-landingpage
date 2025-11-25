exports.handler = async function (event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers, body: "Method Not Allowed" };
    }

    try {
        const data = JSON.parse(event.body);
        const { subscriptionID, planId } = data;

        console.log(`New Subscription: ${subscriptionID} for Plan: ${planId}`);

        // TODO: 
        // 1. Validate subscription with PayPal API using your Client Secret
        // 2. Create user in your Database (Neon/Postgres)
        // 3. Trigger "Welcome Email" via Beehiiv API

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "Subscription recorded successfully" })
        };
    } catch (error) {
        console.error("Subscription Error", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Internal Server Error" })
        };
    }
};