import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { LOGO_RADIUS_RATIO, SIZE } from '../../constants';

interface LogoProps {
  size?: number;
}

export function Logo({ size = SIZE.logoSm }: LogoProps) {
  return (
    <Image
      source={require('../../../assets/icon.png')}
      style={[styles.logo, { width: size, height: size, borderRadius: size * LOGO_RADIUS_RATIO }]}
    />
  );
}

const styles = StyleSheet.create({
  logo: { resizeMode: 'cover' },
});
