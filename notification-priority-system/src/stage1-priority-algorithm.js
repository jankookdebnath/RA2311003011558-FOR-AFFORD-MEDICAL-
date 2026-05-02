/**
 * Stage 1: Priority Inbox Algorithm
 * Fetches notifications from API and sorts by priority weight and recency
 * 
 * Priority Weights: Placement (3) > Result (2) > Event (1)
 * Secondary Sort: By Timestamp (most recent first)
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  API_ENDPOINT: 'http://20.207.122.201/evaluation-service/notifications',
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || '', // Set from environment
  DEFAULT_TOP_N: 10,
  PRIORITY_WEIGHTS: {
    'Placement': 3,
    'Result': 2,
    'Event': 1
  },
  OUTPUT_FILE: path.join(__dirname, '../data/prioritized-notifications.json')
};

/**
 * Validate notification object structure
 * @param {Object} notification - Notification object to validate
 * @returns {boolean} - True if valid
 */
function validateNotification(notification) {
  return (
    notification &&
    typeof notification === 'object' &&
    notification.type &&
    notification.timestamp &&
    notification.id
  );
}

/**
 * Get priority weight for notification type
 * @param {string} type - Notification type (Placement, Result, Event)
 * @returns {number} - Weight value
 */
function getPriorityWeight(type) {
  return CONFIG.PRIORITY_WEIGHTS[type] || 0;
}

/**
 * Convert timestamp string to Date object for comparison
 * @param {string} timestamp - ISO timestamp string
 * @returns {Date} - Parsed date
 */
function parseTimestamp(timestamp) {
  try {
    return new Date(timestamp);
  } catch (e) {
    console.warn(`Invalid timestamp format: ${timestamp}`);
    return new Date(0); // Fallback to epoch
  }
}

/**
 * Sort notifications by priority weight and recency
 * @param {Array} notifications - Array of notification objects
 * @returns {Array} - Sorted notifications
 */
function sortNotifications(notifications) {
  return notifications.sort((a, b) => {
    // Primary sort: by priority weight (descending)
    const weightA = getPriorityWeight(a.type);
    const weightB = getPriorityWeight(b.type);
    
    if (weightA !== weightB) {
      return weightB - weightA; // Higher weight first
    }
    
    // Secondary sort: by timestamp (most recent first)
    const dateA = parseTimestamp(a.timestamp);
    const dateB = parseTimestamp(b.timestamp);
    
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Filter notifications to top N
 * @param {Array} notifications - Sorted notifications array
 * @param {number} n - Number of top notifications to keep
 * @returns {Array} - Top N notifications
 */
function getTopNotifications(notifications, n) {
  return notifications.slice(0, n);
}

/**
 * Fetch notifications from API with bearer token
 * @returns {Promise<Array>} - Array of notifications
 */
async function fetchNotifications() {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    console.log('📡 Fetching notifications from API...');
    const response = await axios.get(CONFIG.API_ENDPOINT, config);
    
    const notifications = response.data.notifications || response.data || [];
    console.log(`✅ Successfully fetched ${notifications.length} notifications`);
    
    return notifications;
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('❌ Authentication failed. Please check your ACCESS_TOKEN.');
      console.error('Set ACCESS_TOKEN environment variable with your bearer token.');
    } else {
      console.error(`❌ Error fetching notifications: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Enrich notification with additional metadata
 * @param {Object} notification - Notification object
 * @param {number} index - Position index
 * @returns {Object} - Enriched notification
 */
function enrichNotification(notification, index) {
  return {
    ...notification,
    priority_rank: index + 1,
    weight: getPriorityWeight(notification.type),
    viewed: false,
    fetched_at: new Date().toISOString()
  };
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🚀 Starting Stage 1: Priority Notification Algorithm\n');

    // Check for access token
    if (!CONFIG.ACCESS_TOKEN) {
      console.error('❌ ACCESS_TOKEN not set');
      console.error('Please set: export ACCESS_TOKEN="your-bearer-token"');
      process.exit(1);
    }

    // Fetch notifications
    const notifications = await fetchNotifications();
    
    if (notifications.length === 0) {
      console.warn('⚠️  No notifications received from API');
      return;
    }

    // Validate notifications
    const validNotifications = notifications.filter(validateNotification);
    console.log(`✓ Validated: ${validNotifications.length}/${notifications.length} notifications\n`);

    // Sort by priority weight and recency
    console.log('🔄 Sorting by priority weight (Placement > Result > Event)...');
    console.log('   Then by recency (most recent first)\n');
    const sortedNotifications = sortNotifications(validNotifications);

    // Get top N (default: 10)
    const topN = CONFIG.DEFAULT_TOP_N;
    const topNotifications = getTopNotifications(sortedNotifications, topN);

    // Enrich with metadata
    const enrichedNotifications = topNotifications.map((notif, idx) => 
      enrichNotification(notif, idx)
    );

    // Display results
    console.log(`📊 Top ${topN} Prioritized Notifications:\n`);
    console.log('─'.repeat(80));
    
    enrichedNotifications.forEach((notif, idx) => {
      const date = new Date(notif.timestamp).toLocaleString();
      console.log(`${idx + 1}. [${notif.type}] Weight: ${notif.weight} | ${date}`);
      console.log(`   ${notif.message || notif.title || 'No message'}`);
      console.log('');
    });

    console.log('─'.repeat(80));

    // Save results to file
    const outputDir = path.dirname(CONFIG.OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputData = {
      generated_at: new Date().toISOString(),
      total_fetched: notifications.length,
      total_valid: validNotifications.length,
      top_n_returned: topNotifications.length,
      notifications: enrichedNotifications
    };

    fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(outputData, null, 2));
    console.log(`\n✅ Results saved to: ${CONFIG.OUTPUT_FILE}`);

    // Summary statistics
    console.log('\n📈 Summary Statistics:');
    const typeCount = enrichedNotifications.reduce((acc, notif) => {
      acc[notif.type] = (acc[notif.type] || 0) + 1;
      return acc;
    }, {});
    
    Object.entries(typeCount).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });

    return enrichedNotifications;

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { 
  sortNotifications, 
  getTopNotifications, 
  getPriorityWeight,
  validateNotification,
  enrichNotification 
};
