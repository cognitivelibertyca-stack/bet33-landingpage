exports.handler = async function (event, context) {
    // PayPal will POST to this URL
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const body = JSON.parse(event.body);
        const eventType = body.event_type;
        const resource = body.resource;

        console.log(`Received PayPal Webhook: ${eventType}`);

        // Handle specific events from paypal-api-webhook.txt
        switch (eventType) {
            case 'BILLING.SUBSCRIPTION.ACTIVATED':
                // A user just started paying
                // TODO: Provision access in your DB (e.g. Neon/Postgres)
                // TODO: Send welcome email via Beehiiv
                console.log(`Subscription Activated: ${resource.id}`);
                break;

            case 'BILLING.SUBSCRIPTION.CANCELLED':
                // A user cancelled
                // TODO: Revoke access in DB
                console.log(`Subscription Cancelled: ${resource.id}`);
                break;

            case 'PAYMENT.SALE.COMPLETED':
                // Recurring payment successful
                console.log(`Payment Received: ${resource.id}`);
                break;

            case 'PAYMENT.SALE.DENIED':
                // Payment failed
                // TODO: Notify user
                console.log(`Payment Denied: ${resource.id}`);
                break;

            default:
                console.log(`Unhandled Event: ${eventType}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Webhook received" })
        };

    } catch (error) {
        console.error("Webhook processing error:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid Payload" })
        };
    }
};