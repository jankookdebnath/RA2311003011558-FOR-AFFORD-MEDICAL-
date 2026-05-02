# Notification System Design Documentation

## Stage 1: Priority Logic (Backend Algorithm)

### 1. Overview
The Priority Inbox system implements a sophisticated notification prioritization algorithm that sorts notifications by importance and recency, enabling users to focus on the most critical updates first.

**Key Principle**: Ensure high-value notifications (Placement, Results) are surfaced before routine event notifications.

---

### 2. Priority Weighting System

#### Weight Definition
- **Placement (Weight: 3)** - Highest priority
  - Job placements, internship offers
  - Critical career-related information
- **Result (Weight: 2)** - Medium priority
  - Exam results, assignment grades
  - Academic evaluations
- **Event (Weight: 1)** - Lower priority
  - General announcements, reminders
  - Information updates

#### Rationale
This hierarchy reflects the importance of notifications:
1. **Placement** notifications impact immediate opportunities and should never be missed
2. **Result** notifications are time-sensitive academic information
3. **Event** notifications are informational but less urgent

---

### 3. Sorting Algorithm

#### Two-Level Sort Strategy

```
ALGORITHM SortNotifications(notifications):
  INPUT: Array of notification objects
  OUTPUT: Sorted array prioritized by importance and recency
  
  STEP 1: Primary Sort by Weight
    - Partition notifications into three groups by type
    - Order groups: Placement (3), Result (2), Event (1)
    - Higher weights = Higher priority (appear first)
  
  STEP 2: Secondary Sort by Timestamp (within each weight group)
    - Compare ISO timestamp strings
    - Convert to Date objects for accurate comparison
    - Most recent timestamps first (descending order)
    - Recent notifications of same priority level appear first
  
  STEP 3: Merge sorted groups
    - Concatenate: [Placement notifications] + [Result notifications] + [Event notifications]
    - Result: Fully sorted, ready-to-display list
```

#### Time Complexity
- **Best Case**: O(n log n) - When using efficient sort (JavaScript's Array.sort)
- **Space Complexity**: O(n) - For storing sorted array

#### Why Two-Level Sort?
- **User Psychology**: Users care most about high-priority items
- **Business Logic**: Critical notifications must always appear first
- **Recency Tiebreaker**: Within same priority, recent items are more relevant

---

### 4. Top-N Filtering

#### Purpose
Prevent information overload by limiting displayed notifications to the most relevant subset.

#### Implementation
```
FUNCTION getTopNotifications(sortedArray, n):
  RETURN sortedArray[0...n-1]  // Array slice operation O(n)
```

#### Why Efficient?
- Single array slice operation: O(n) time
- No additional sorting needed (already sorted)
- Memory-efficient: Reuses existing array

#### Configurable Values
Users can select:
- **Top 10**: Quick overview (default)
- **Top 15**: Balanced view
- **Top 20**: Comprehensive view

---

### 5. Data Structure

#### Input Notification Object
```json
{
  "id": "unique-identifier",
  "type": "Placement|Result|Event",
  "title": "string",
  "message": "detailed notification text",
  "timestamp": "ISO-8601 datetime",
  "read": "boolean",
  "source": "system source identifier"
}
```

#### Enriched Output Object
```json
{
  "id": "unique-identifier",
  "type": "Placement|Result|Event",
  "title": "string",
  "message": "detailed notification text",
  "timestamp": "ISO-8601 datetime",
  "read": "boolean",
  "source": "system source identifier",
  "priority_rank": 1,
  "weight": 3,
  "viewed": false,
  "fetched_at": "ISO-8601 datetime"
}
```

---

### 6. Validation Strategy

#### Why Validation?
- API might return malformed data
- Prevents runtime errors in sorting logic
- Ensures data consistency

#### Validation Criteria
Each notification must have:
1. `id` - Unique identifier (exists and non-null)
2. `type` - One of: Placement, Result, Event (exists)
3. `timestamp` - Valid ISO-8601 datetime string (parseable)

```javascript
validateNotification(notification) {
  return (
    notification &&
    typeof notification === 'object' &&
    notification.type &&           // Must have type
    notification.timestamp &&       // Must have timestamp
    notification.id                 // Must have id
  );
}
```

---

### 7. Error Handling

#### Scenarios Addressed

| Error | Cause | Solution |
|-------|-------|----------|
| **Auth Failed (401)** | Invalid bearer token | Guide user to set ACCESS_TOKEN |
| **Network Timeout** | API unavailable | Retry mechanism in frontend |
| **Malformed Timestamp** | Invalid date format | Fallback to epoch (year 1970) |
| **Missing Fields** | Incomplete notification | Filter out in validation step |

---

### 8. Performance Optimization

### Maintain Top-N Efficiently

#### Scenario: Real-time Notification Stream
Instead of re-sorting entire list:

```javascript
ALGORITHM AddNewNotificationToTopN(topNList, newNotification, n):
  1. Insert new notification in correct sorted position
  2. If list.length > n:
     - Remove lowest priority notification (last element)
  3. Return updated top-n list
  
  Time: O(n) insertion + O(1) removal = O(n)
  Better than: O(n log n) full resort
```

#### Use Case Example
- API streams 1000 notifications
- We only need top 10
- Using merge insertion: 1000 × O(10) = O(10,000) operations
- vs. Full sort: O(1,000 log 1,000) ≈ O(10,000) operations
- **Benefit**: Maintains up-to-date top-N without full re-sort

---

### 9. Testing Strategy

#### Unit Tests (Pseudo-code)

```javascript
TEST sortByWeight:
  INPUT: [Event(1), Placement(3), Result(2)]
  EXPECTED: [Placement(3), Result(2), Event(1)]

TEST sortByRecency:
  INPUT: Two Placement notifications, different timestamps
  EXPECTED: Most recent first

TEST topNFiltering:
  INPUT: 100 notifications, n=10
  EXPECTED: Exactly 10 notifications returned

TEST validation:
  INPUT: Notification with missing 'timestamp'
  EXPECTED: Filtered out, not included in output
```

---

### 10. API Integration

#### Endpoint Details
- **URL**: `http://20.207.122.201/evaluation-service/notifications`
- **Method**: GET
- **Authentication**: Bearer Token (from Stage registration)
- **Response**: Array of notifications

#### Header Requirements
```
Authorization: Bearer <your-access-token>
Content-Type: application/json
```

---

### 11. Output Example

#### Console Output
```
🚀 Starting Stage 1: Priority Notification Algorithm

📡 Fetching notifications from API...
✅ Successfully fetched 47 notifications
✓ Validated: 47/47 notifications

🔄 Sorting by priority weight (Placement > Result > Event)...
   Then by recency (most recent first)

📊 Top 10 Prioritized Notifications:

────────────────────────────────────────────────────────────────────────────────
1. [Placement] Weight: 3 | 5/2/2026, 2:30:15 PM
   Congratulations! You have been selected for internship at TechCorp

2. [Result] Weight: 2 | 5/1/2026, 11:45:00 AM
   Your CS101 exam results are now available

3. [Event] Weight: 1 | 4/30/2026, 3:20:10 PM
   New library resources available for download
────────────────────────────────────────────────────────────────────────────────

✅ Results saved to: data/prioritized-notifications.json

📈 Summary Statistics:
   Placement: 2
   Result: 4
   Event: 4
```

---

### 12. Implementation Details

#### Key Functions

**`getPriorityWeight(type: string): number`**
- Maps notification type to numeric weight
- O(1) constant time lookup
- Fallback to 0 for unknown types

**`parseTimestamp(timestamp: string): Date`**
- Safely converts ISO string to Date object
- Handles invalid formats gracefully
- Epoch fallback prevents crashes

**`sortNotifications(notifications: Array): Array`**
- Main sorting logic
- Two-level comparator function
- Returns new sorted array (non-mutating option available)

**`getTopNotifications(notifications: Array, n: number): Array`**
- Array slice operation
- O(n) time complexity
- Memory-efficient

**`enrichNotification(notification: Object, index: number): Object`**
- Adds computed fields
- Tracks position and rank
- Maintains immutability of original

---

### 13. Edge Cases Handled

1. **Empty Notification List** → Gracefully handled, displays warning
2. **Same Weight & Timestamp** → Maintains original array order
3. **Invalid Date Format** → Fallback to epoch, doesn't crash
4. **Top-N > Total Notifications** → Returns all available
5. **Null/Undefined Values** → Filtered in validation step
6. **Network Errors** → Caught and logged with guidance

---

### 14. Future Enhancements

1. **User Preferences**: Allow users to customize weight values
2. **AI-Based Scoring**: Machine learning model for dynamic weights
3. **Notification Categories**: Additional filters beyond type
4. **Mute/Archive**: Track dismissed notifications
5. **Real-time Updates**: WebSocket integration for live notifications
6. **Caching Layer**: Redis for frequently accessed top-N lists

---

## Conclusion

The Stage 1 algorithm provides a robust, scalable foundation for the Priority Inbox. By combining intelligent weighting with recency-based sorting and efficient top-N filtering, we deliver a system that respects user attention while ensuring critical notifications are never missed.

**Key Achievements**:
✅ O(n log n) sorting efficiency
✅ Two-level sorting strategy for intelligent prioritization
✅ Comprehensive validation and error handling
✅ Real-time stream support with incremental updates
✅ Clean, maintainable, documented code
