#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Desktop Performance Monitor');
console.log('==============================\n');

// Get basic performance metrics
function getPerformanceMetrics() {
  try {
    console.log('📊 Checking basic performance metrics...\n');
    
    // Check image optimization
    console.log('🖼️  Checking image optimization...');
    const publicDir = path.join(__dirname, '../public');
    const logosDir = path.join(publicDir, 'logos');
    const brandDir = path.join(publicDir, 'brand');
    
    if (fs.existsSync(logosDir)) {
      const logoFiles = fs.readdirSync(logosDir).filter(file => file.endsWith('.png'));
      console.log(`📸 Found ${logoFiles.length} logo files`);
      
      let largeFiles = 0;
      let totalSize = 0;
      logoFiles.forEach(file => {
        const filePath = path.join(logosDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        totalSize += sizeKB;
        
        if (sizeKB > 500) {
          console.log(`⚠️  Large logo file: ${file} (${sizeKB} KB)`);
          largeFiles++;
        }
      });
      
      console.log(`📊 Total logo size: ${totalSize} KB`);
      if (largeFiles === 0) {
        console.log('✅ All logo files are optimized');
      } else {
        console.log(`⚠️  ${largeFiles} large logo files found`);
      }
    }
    
    // Check brand images
    if (fs.existsSync(brandDir)) {
      const brandFiles = fs.readdirSync(brandDir).filter(file => file.endsWith('.png'));
      console.log(`\n🏷️  Found ${brandFiles.length} brand files`);
      
      brandFiles.forEach(file => {
        const filePath = path.join(brandDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        
        if (sizeKB > 1000) {
          console.log(`⚠️  Large brand file: ${file} (${sizeKB} KB)`);
        } else {
          console.log(`✅ Optimized brand file: ${file} (${sizeKB} KB)`);
        }
      });
    }
    
    // Check video optimization
    console.log('\n🎥 Checking video optimization...');
    const videosDir = path.join(publicDir, 'videos');
    
    if (fs.existsSync(videosDir)) {
      const videoFiles = fs.readdirSync(videosDir).filter(file => file.endsWith('.mp4'));
      console.log(`🎬 Found ${videoFiles.length} video files`);
      
      let largeVideos = 0;
      let totalVideoSize = 0;
      videoFiles.forEach(file => {
        const filePath = path.join(videosDir, file);
        const stats = fs.statSync(filePath);
        const sizeMB = Math.round(stats.size / (1024 * 1024) * 100) / 100;
        totalVideoSize += sizeMB;
        
        if (sizeMB > 10) {
          console.log(`⚠️  Large video file: ${file} (${sizeMB} MB)`);
          largeVideos++;
        } else {
          console.log(`✅ Optimized video: ${file} (${sizeMB} MB)`);
        }
      });
      
      console.log(`📊 Total video size: ${totalVideoSize} MB`);
      if (largeVideos === 0) {
        console.log('✅ All video files are optimized');
      } else {
        console.log(`⚠️  ${largeVideos} large video files found`);
      }
    }
    
    // Check Next.js configuration
    console.log('\n⚙️  Checking Next.js configuration...');
    const nextConfigPath = path.join(__dirname, '../config/next.config.ts');
    if (fs.existsSync(nextConfigPath)) {
      const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
      
      if (nextConfig.includes('image/webp') && nextConfig.includes('image/avif')) {
        console.log('✅ Next.js image optimization is configured');
      } else {
        console.log('⚠️  Next.js image optimization may not be fully configured');
      }
      
      if (nextConfig.includes('optimizePackageImports')) {
        console.log('✅ Package optimization is configured');
      }
      
      if (nextConfig.includes('compress: true')) {
        console.log('✅ Compression is enabled');
      }
      
      if (nextConfig.includes('poweredByHeader: false')) {
        console.log('✅ Security headers are configured');
      }
    }
    
    // Check component optimization
    console.log('\n🧩 Checking component optimization...');
    const componentsDir = path.join(__dirname, '../app/components');
    if (fs.existsSync(componentsDir)) {
      const componentFiles = fs.readdirSync(componentsDir).filter(file => file.endsWith('.tsx'));
      console.log(`📦 Found ${componentFiles.length} React components`);
      
      let optimizedComponents = 0;
      componentFiles.forEach(file => {
        const filePath = path.join(componentsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes('next/image')) {
          optimizedComponents++;
        }
      });
      
      console.log(`✅ ${optimizedComponents} components use Next.js Image optimization`);
    }
    
    console.log('\n✅ Performance check completed!');
    console.log('\n📋 Summary:');
    console.log('- Image optimization analysis completed');
    console.log('- Video optimization analysis completed');
    console.log('- Next.js configuration verified');
    console.log('- Component optimization checked');
    console.log('\n💡 Recommendations:');
    console.log('- Consider converting large PNG files to WebP format');
    console.log('- Optimize video files for web delivery');
    console.log('- Use Next.js Image component for all images');
    console.log('- Enable lazy loading for non-critical assets');
    
  } catch (error) {
    console.error('❌ Error checking performance metrics:', error.message);
  }
}

// Main execution
getPerformanceMetrics(); 