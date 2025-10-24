# Cron Job and Queue System

This project includes a cron job system that runs every 1 second and processes messages through a queue.

## Features

- **Automatic Cron Job**: Runs every 1 second (`*/1 * * * * *`)
- **Queue Processing**: Messages are processed through BullMQ with Redis
- **Manual Trigger**: Ability to manually trigger cron jobs
- **Queue Statistics**: Monitor queue status and performance
- **Error Handling**: Automatic retry with exponential backoff

## API Endpoints

### 1. Get Cron Status

```bash
GET /cron/status
```

Returns information about the cron job configuration.

**Response:**

```json
{
  "success": true,
  "message": "Cron job is running every 1 second",
  "cronExpression": "*/1 * * * * *",
  "description": "Executes every second and adds messages to the queue"
}
```

### 2. Trigger Manual Cron Job

```bash
POST /cron/trigger
```

Manually triggers a cron job execution.

**Response:**

```json
{
  "success": true,
  "message": "Cron job triggered successfully"
}
```

### 3. Get Queue Statistics

```bash
GET /cron/stats
```

Returns current queue statistics.

**Response:**

```json
{
  "success": true,
  "data": {
    "waiting": 0,
    "active": 0,
    "completed": 26,
    "failed": 0,
    "total": 26
  },
  "message": "Queue statistics retrieved successfully"
}
```

## Message Format

Each message processed by the queue contains:

```json
{
  "id": 1703123456789,
  "message": "Cron job executed successfully",
  "timestamp": "2023-12-21T10:30:56.789Z",
  "status": "success",
  "processedAt": "2023-12-21T10:30:56.890Z",
  "processedBy": "MessageQueueProcessor"
}
```

## Configuration

The cron job is configured in `src/cron/cron-job.service.ts`:

- **Cron Expression**: `*/1 * * * * *` (every 1 second)
- **Queue Name**: `message-queue`
- **Retry Attempts**: 3
- **Backoff Strategy**: Exponential with 2-second delay

## Requirements

- Redis server running on localhost:6379
- NestJS application with BullMQ and ScheduleModule

## Monitoring

You can monitor the cron job activity through:

1. Application logs (shows execution timestamps)
2. Queue statistics endpoint
3. Redis monitoring tools

## Testing

Test the endpoints using curl:

```bash
# Check status
curl -X GET http://localhost:3000/cron/status

# Trigger manually
curl -X POST http://localhost:3000/cron/trigger

# Get statistics
curl -X GET http://localhost:3000/cron/stats
```
