// Navbar
//STYLES
import React, { useState, useEffect } from "react";

//CONTEXT
import { useContext } from "react";

//REACT ROUTER
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

//ICONS
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import {
  MdOutlineDashboard,
  MdOutlineAnalytics,
  MdOutlinedFlag,
  MdPeopleOutline,
  MdOutlineMessage,
  MdOutlineLogout,
} from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { FaReact, FaTimes } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PieChartIcon from "@mui/icons-material/PieChart";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { BsThreeDots } from "react-icons/bs";
import { VscDashboard } from "react-icons/vsc";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

export {
  useState,
  useEffect,
  useContext,
  NavLink,
  motion,
  ElectricMeterIcon,
  MdOutlineAnalytics,
  MdOutlinedFlag,
  MdPeopleOutline,
  MdOutlineMessage,
  MdOutlineLogout,
  IoMdLogIn,
  FaReact,
  FaTimes,
  AccountCircleIcon,
  PieChartIcon,
  PhonelinkSetupIcon,
  DashboardIcon,
  BsThreeDots,
  VscDashboard,
  styled,
  useNavigate,
};
